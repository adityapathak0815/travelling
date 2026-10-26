$port = 3000
$root = "c:\Users\MY PC\best"
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
try {
    $listener.Start()
} catch {
    Write-Host "Failed to start server on port $port"
    exit 1
}
Write-Host "Server running on http://localhost:$port"

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $req = $context.Request
        $res = $context.Response
        try {
            $url = [System.Uri]::UnescapeDataString($req.Url.AbsolutePath)
            if ($url -eq '/') { $url = '/index.html' }
            $localRel = $url.TrimStart('/').Replace('/', '\')
            $safePath = [System.IO.Path]::GetFullPath((Join-Path $root $localRel))
            if ($safePath.StartsWith($root) -and [System.IO.File]::Exists($safePath)) {
                $ext = [System.IO.Path]::GetExtension($safePath).ToLower()
                $mime = switch ($ext) {
                    '.html' { 'text/html; charset=utf-8' }
                    '.js'   { 'application/javascript; charset=utf-8' }
                    '.css'  { 'text/css; charset=utf-8' }
                    '.jpg'  { 'image/jpeg' }
                    '.jpeg' { 'image/jpeg' }
                    '.png'  { 'image/png' }
                    '.svg'  { 'image/svg+xml' }
                    '.webp' { 'image/webp' }
                    '.json' { 'application/json; charset=utf-8' }
                    default { 'application/octet-stream' }
                }
                $res.ContentType = $mime
                $bytes = [System.IO.File]::ReadAllBytes($safePath)
                $res.ContentLength64 = $bytes.Length
                if ($req.HttpMethod -ne 'HEAD') {
                    $res.OutputStream.Write($bytes, 0, $bytes.Length)
                }
                $res.StatusCode = 200
            } else {
                $res.StatusCode = 404
                $msg = [System.Text.Encoding]::UTF8.GetBytes("Not Found")
                $res.ContentLength64 = $msg.Length
                if ($req.HttpMethod -ne 'HEAD') {
                    $res.OutputStream.Write($msg, 0, $msg.Length)
                }
            }
        } catch {
            $res.StatusCode = 500
        } finally {
            try { $res.OutputStream.Close() } catch {}
            try { $res.Close() } catch {}
        }
    } catch {
        Start-Sleep -Milliseconds 50
    }
}
