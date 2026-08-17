param(
  [string]$ProjectRoot = (Split-Path -Parent $PSScriptRoot)
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$ProjectRoot = [System.IO.Path]::GetFullPath($ProjectRoot)
$ImageRoot = Join-Path $ProjectRoot 'assets\images'
$GalleryRoot = Join-Path $ImageRoot 'gallery'
$GearRoot = Join-Path $ImageRoot 'gear'

New-Item -ItemType Directory -Force -Path $GalleryRoot, $GearRoot | Out-Null

function Get-JpegEncoder {
  [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
    Where-Object MimeType -eq 'image/jpeg' |
    Select-Object -First 1
}

function Save-JpegFit {
  param(
    [string]$Source,
    [string]$Destination,
    [int]$MaxWidth,
    [int]$MaxHeight,
    [int]$Quality = 82
  )

  $sourceImage = [System.Drawing.Image]::FromFile($Source)
  try {
    $widthScale = [double]$MaxWidth / [double]$sourceImage.Width
    $heightScale = [double]$MaxHeight / [double]$sourceImage.Height
    $scale = [Math]::Min([double]1, [Math]::Min($widthScale, $heightScale))
    $width = [Math]::Max(1, [int][Math]::Round($sourceImage.Width * $scale))
    $height = [Math]::Max(1, [int][Math]::Round($sourceImage.Height * $scale))
    $bitmap = New-Object System.Drawing.Bitmap($width, $height, [System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
    try {
      $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
      try {
        $graphics.Clear([System.Drawing.Color]::Black)
        $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $graphics.DrawImage($sourceImage, 0, 0, $width, $height)
      } finally {
        $graphics.Dispose()
      }

      $parameters = New-Object System.Drawing.Imaging.EncoderParameters(1)
      try {
        $parameters.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
          [System.Drawing.Imaging.Encoder]::Quality,
          [long]$Quality
        )
        $bitmap.Save($Destination, (Get-JpegEncoder), $parameters)
      } finally {
        $parameters.Dispose()
      }
    } finally {
      $bitmap.Dispose()
    }
  } finally {
    $sourceImage.Dispose()
  }
}

function Save-JpegCrop {
  param(
    [string]$Source,
    [string]$Destination,
    [int]$Width,
    [int]$Height,
    [int]$Quality = 82
  )

  $sourceImage = [System.Drawing.Image]::FromFile($Source)
  try {
    $widthScale = [double]$Width / [double]$sourceImage.Width
    $heightScale = [double]$Height / [double]$sourceImage.Height
    $scale = [Math]::Max($widthScale, $heightScale)
    $drawWidth = [int][Math]::Ceiling($sourceImage.Width * $scale)
    $drawHeight = [int][Math]::Ceiling($sourceImage.Height * $scale)
    $x = [int][Math]::Round(($Width - $drawWidth) / 2)
    $y = [int][Math]::Round(($Height - $drawHeight) / 2)
    $bitmap = New-Object System.Drawing.Bitmap($Width, $Height, [System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
    try {
      $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
      try {
        $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $graphics.DrawImage($sourceImage, $x, $y, $drawWidth, $drawHeight)
      } finally {
        $graphics.Dispose()
      }

      $parameters = New-Object System.Drawing.Imaging.EncoderParameters(1)
      try {
        $parameters.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
          [System.Drawing.Imaging.Encoder]::Quality,
          [long]$Quality
        )
        $bitmap.Save($Destination, (Get-JpegEncoder), $parameters)
      } finally {
        $parameters.Dispose()
      }
    } finally {
      $bitmap.Dispose()
    }
  } finally {
    $sourceImage.Dispose()
  }
}

function Save-PngFit {
  param(
    [string]$Source,
    [string]$Destination,
    [int]$Width,
    [int]$Height
  )

  $sourceImage = [System.Drawing.Image]::FromFile($Source)
  try {
    $bitmap = New-Object System.Drawing.Bitmap($Width, $Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    try {
      $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
      try {
        $graphics.Clear([System.Drawing.Color]::Transparent)
        $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $graphics.DrawImage($sourceImage, 0, 0, $Width, $Height)
      } finally {
        $graphics.Dispose()
      }
      $bitmap.Save($Destination, [System.Drawing.Imaging.ImageFormat]::Png)
    } finally {
      $bitmap.Dispose()
    }
  } finally {
    $sourceImage.Dispose()
  }
}

$galleryImages = @(
  @{ Source = 'stu2_1.jpg'; Name = 'studio-console-1' },
  @{ Source = 'stu2_2.jpg'; Name = 'studio-console-2' },
  @{ Source = 'stu2_3.jpg'; Name = 'studio-console-3' },
  @{ Source = 'stu2_4.JPG'; Name = 'studio-console-4' },
  @{ Source = 'stu2_5.jpg'; Name = 'studio-console-5' },
  @{ Source = 'paradiso_foto.png'; Name = 'paradiso-studio' },
  @{ Source = 'piano_casa.jpg'; Name = 'home-piano' }
)

Save-JpegFit -Source (Join-Path $ProjectRoot 'Foto_Web-3.png') -Destination (Join-Path $ImageRoot 'background.jpg') -MaxWidth 2560 -MaxHeight 1600 -Quality 82
Save-JpegCrop -Source (Join-Path $ProjectRoot 'Foto_Web-3.png') -Destination (Join-Path $ImageRoot 'og-image.jpg') -Width 1200 -Height 630 -Quality 84
Save-PngFit -Source (Join-Path $ProjectRoot 'webo_logo_white copy.png') -Destination (Join-Path $ImageRoot 'favicon.png') -Width 192 -Height 192
Save-PngFit -Source (Join-Path $ProjectRoot 'webo_logo_white copy.png') -Destination (Join-Path $ImageRoot 'apple-touch-icon.png') -Width 180 -Height 180
Save-JpegFit -Source (Join-Path $ProjectRoot 'talkbox.jpeg') -Destination (Join-Path $GearRoot 'talkbox.jpg') -MaxWidth 1440 -MaxHeight 1440 -Quality 84

foreach ($image in $galleryImages) {
  $source = Join-Path $ProjectRoot $image.Source
  Save-JpegFit -Source $source -Destination (Join-Path $GalleryRoot "$($image.Name).jpg") -MaxWidth 1800 -MaxHeight 1800 -Quality 82
  Save-JpegFit -Source $source -Destination (Join-Path $GalleryRoot "$($image.Name)-thumb.jpg") -MaxWidth 480 -MaxHeight 480 -Quality 78
}

Get-ChildItem -File -Recurse $ImageRoot |
  Sort-Object FullName |
  Select-Object @{Name='File'; Expression={$_.FullName.Substring($ProjectRoot.Length + 1)}}, @{Name='KB'; Expression={[Math]::Round($_.Length / 1KB)}}
