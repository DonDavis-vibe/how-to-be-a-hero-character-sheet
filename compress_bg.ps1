Add-Type -AssemblyName System.Drawing
$sourcePath = 'E:\vibe_coding\rocketbeans\logo\love\background.png'
$destPath = 'E:\vibe_coding\rocketbeans\htbah-tool\assets\bg_lovecraft.jpg'

$img = [System.Drawing.Image]::FromFile($sourcePath)

$bmp = New-Object System.Drawing.Bitmap($img.Width, $img.Height)
$graph = [System.Drawing.Graphics]::FromImage($bmp)
$graph.Clear([System.Drawing.Color]::White)
$graph.DrawImage($img, 0, 0, $img.Width, $img.Height)

$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 75L)
$jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }

$bmp.Save($destPath, $jpegCodec[0], $encoderParams)

$graph.Dispose()
$bmp.Dispose()
$img.Dispose()
Write-Host "Compressed new background to bg_lovecraft.jpg"
