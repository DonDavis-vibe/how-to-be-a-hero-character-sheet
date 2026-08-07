Add-Type -AssemblyName System.Drawing
$dir = 'E:\vibe_coding\rocketbeans\htbah-tool\assets'

Get-ChildItem -Path $dir -File | Where-Object { $_.Length -gt 1.5MB -and ($_.Extension -eq '.png' -or $_.Extension -eq '.jpg') } | ForEach-Object {
    $img = [System.Drawing.Image]::FromFile($_.FullName)
    $newName = $_.Name.Replace('.png', '.jpg')
    $tempPath = Join-Path $dir ($newName + ".tmp")
    
    $bmp = New-Object System.Drawing.Bitmap($img.Width, $img.Height)
    $graph = [System.Drawing.Graphics]::FromImage($bmp)
    $graph.Clear([System.Drawing.Color]::White)
    $graph.DrawImage($img, 0, 0, $img.Width, $img.Height)
    
    $encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, 65L)
    $jpegCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq 'image/jpeg' }
    
    $bmp.Save($tempPath, $jpegCodec[0], $encoderParams)
    
    $graph.Dispose()
    $bmp.Dispose()
    $img.Dispose()
    
    $destPath = Join-Path $dir $newName
    Move-Item -Path $tempPath -Destination $destPath -Force
    
    Write-Host "Compressed: $newName"
    
    if ($_.Extension -eq '.png') {
        Remove-Item $_.FullName -Force
    }
}
