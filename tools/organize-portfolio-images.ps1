param(
  [string]$ProjectRoot = (Split-Path -Parent $PSScriptRoot)
)

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$ProjectRoot = [System.IO.Path]::GetFullPath($ProjectRoot)
$PortfolioRoot = Join-Path $ProjectRoot 'assets\images\portfolio'

function Assert-ProjectPath {
  param([string]$Path)
  $fullPath = [System.IO.Path]::GetFullPath($Path)
  if (-not $fullPath.StartsWith("$ProjectRoot\", [System.StringComparison]::OrdinalIgnoreCase)) {
    throw "Ruta fuera del proyecto: $fullPath"
  }
  return $fullPath
}

function Get-JpegEncoder {
  [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
    Where-Object MimeType -eq 'image/jpeg' |
    Select-Object -First 1
}

function Save-JpegFit {
  param(
    [string]$Source,
    [string]$Destination,
    [int]$MaxWidth = 1600,
    [int]$MaxHeight = 1600,
    [int]$Quality = 82
  )

  $sourceImage = [System.Drawing.Image]::FromFile($Source)
  try {
    $scale = [Math]::Min(
      [double]1,
      [Math]::Min([double]$MaxWidth / $sourceImage.Width, [double]$MaxHeight / $sourceImage.Height)
    )
    $width = [Math]::Max(1, [int][Math]::Round($sourceImage.Width * $scale))
    $height = [Math]::Max(1, [int][Math]::Round($sourceImage.Height * $scale))
    $bitmap = New-Object System.Drawing.Bitmap($width, $height, [System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
    try {
      $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
      try {
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

$images = @(
  @{ Source = 'abbeyroad.JPG'; Section = 'abbey-road'; Original = 'abbey-road-studio-1-original.JPG'; Output = 'abbey-road-studio-1.jpg' },
  @{ Source = 'abbeyroad-01.JPG'; Section = 'abbey-road'; Original = 'abbey-road-studio-2-original.JPG'; Output = 'abbey-road-studio-2.jpg' },
  @{ Source = 'paradiso (1).JPG'; Section = 'paradiso'; Original = 'paradiso-1-original.JPG'; Output = 'paradiso-1.jpg' },
  @{ Source = 'paradiso (2).JPG'; Section = 'paradiso'; Original = 'paradiso-2-original.JPG'; Output = 'paradiso-2.jpg' },
  @{ Source = 'paradiso1.JPG'; Section = 'paradiso'; Original = 'paradiso-3-original.JPG'; Output = 'paradiso-3.jpg' },
  @{ Source = 'paradiso-01.jpg'; Section = 'paradiso'; Original = 'paradiso-4-original.jpg'; Output = 'paradiso-4.jpg' },
  @{ Source = 'paradiso-02.jpg'; Section = 'paradiso'; Original = 'paradiso-5-original.jpg'; Output = 'paradiso-5.jpg' },
  @{ Source = 'suitespot-01.jpg'; Section = 'suite-spot'; Original = 'suite-spot-1-original.jpg'; Output = 'suite-spot-1.jpg' },
  @{ Source = 'suitespot-04.jpg'; Section = 'suite-spot'; Original = 'suite-spot-2-original.jpg'; Output = 'suite-spot-2.jpg' },
  @{ Source = 'suitespot-05.jpg'; Section = 'suite-spot'; Original = 'suite-spot-3-original.jpg'; Output = 'suite-spot-3.jpg' },
  @{ Source = 'rockfield.jpg'; Section = 'rockfield'; Original = 'rockfield-studio-original.jpg'; Output = 'rockfield-studio.jpg' }
)

foreach ($image in $images) {
  $sectionRoot = Assert-ProjectPath (Join-Path $PortfolioRoot $image.Section)
  $originalRoot = Assert-ProjectPath (Join-Path $sectionRoot 'originals')
  New-Item -ItemType Directory -Force -Path $sectionRoot, $originalRoot | Out-Null

  $rootSource = Assert-ProjectPath (Join-Path $ProjectRoot $image.Source)
  $original = Assert-ProjectPath (Join-Path $originalRoot $image.Original)
  $output = Assert-ProjectPath (Join-Path $sectionRoot $image.Output)

  if (Test-Path -LiteralPath $rootSource) {
    if (Test-Path -LiteralPath $original) {
      throw "Ya existe el original de destino: $original"
    }
    Move-Item -LiteralPath $rootSource -Destination $original
  }

  if (-not (Test-Path -LiteralPath $original)) {
    throw "No se encontró la imagen original: $($image.Source)"
  }

  Save-JpegFit -Source $original -Destination $output
  $size = [Math]::Round((Get-Item -LiteralPath $output).Length / 1KB)
  Write-Output "$($image.Section)/$($image.Output): $size KB"
}
