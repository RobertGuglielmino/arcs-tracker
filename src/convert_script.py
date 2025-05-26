#!/usr/bin/env python3
"""
JPG to WebP Converter Script
Converts all JPG files in a specified folder to WebP format.
"""

import os
import sys
from pathlib import Path
from PIL import Image

def convert_jpg_to_webp(input_folder, output_folder=None, quality=80, keep_originals=True):
    """
    Convert all JPG files in a folder to WebP format.
    
    Args:
        input_folder (str): Path to folder containing JPG files
        output_folder (str): Path to output folder (optional, defaults to input_folder)
        quality (int): WebP quality (0-100, default 80)
        keep_originals (bool): Whether to keep original JPG files (default True)
    """
    
    # Convert to Path objects
    input_path = Path(input_folder)
    output_path = Path(output_folder) if output_folder else input_path
    
    # Validate input folder
    if not input_path.exists():
        print(f"Error: Input folder '{input_folder}' does not exist.")
        return False
    
    if not input_path.is_dir():
        print(f"Error: '{input_folder}' is not a directory.")
        return False
    
    # Create output folder if it doesn't exist
    output_path.mkdir(parents=True, exist_ok=True)
    
    # Find all JPG files (case insensitive)
    jpg_patterns = ['*.png', '*.jpeg', '*.JPG', '*.JPEG']
    jpg_files = []
    for pattern in jpg_patterns:
        jpg_files.extend(input_path.glob(pattern))
    
    if not jpg_files:
        print(f"No JPG files found in '{input_folder}'.")
        return True
    
    print(f"Found {len(jpg_files)} JPG file(s) to convert...")
    print(f"Output folder: {output_path}")
    print(f"Quality setting: {quality}")
    print("-" * 50)
    
    converted_count = 0
    error_count = 0
    
    for jpg_file in jpg_files:
        try:
            # Generate output filename
            webp_filename = jpg_file.stem + '.webp'
            webp_path = output_path / webp_filename
            
            # Open and convert image
            with Image.open(jpg_file) as img:
                # Convert to RGB if necessary (removes alpha channel)
                if img.mode in ('RGBA', 'LA', 'P'):
                    img = img.convert('RGB')
                
                # Save as WebP
                img.save(webp_path, 'WebP', quality=quality, method=6)
            
            print(f"✓ Converted: {jpg_file.name} → {webp_filename}")
            converted_count += 1
            
            # Optionally remove original file
            if not keep_originals:
                jpg_file.unlink()
                print(f"  └─ Removed original: {jpg_file.name}")
            
        except Exception as e:
            print(f"✗ Error converting {jpg_file.name}: {str(e)}")
            error_count += 1
    
    print("-" * 50)
    print(f"Conversion complete!")
    print(f"Successfully converted: {converted_count} files")
    if error_count > 0:
        print(f"Errors encountered: {error_count} files")
    
    return error_count == 0

def main():
    """Main function to handle command line usage."""
    
    # Default settings
    input_folder = "."  # Current directory
    output_folder = None
    quality = 80
    keep_originals = True
    
    # Simple command line argument handling
    if len(sys.argv) > 1:
        input_folder = sys.argv[1]
    
    if len(sys.argv) > 2:
        output_folder = sys.argv[2]
    
    if len(sys.argv) > 3:
        try:
            quality = int(sys.argv[3])
            if not 0 <= quality <= 100:
                print("Warning: Quality should be between 0-100. Using default 80.")
                quality = 80
        except ValueError:
            print("Warning: Invalid quality value. Using default 80.")
            quality = 80
    
    print("JPG to WebP Converter")
    print("=" * 30)
    print(f"Input folder: {input_folder}")
    
    # Run conversion
    success = convert_jpg_to_webp(
        input_folder=input_folder,
        output_folder=output_folder,
        quality=quality,
        keep_originals=keep_originals
    )
    
    if success:
        print("\nAll conversions completed successfully!")
    else:
        print("\nSome errors occurred during conversion.")
        sys.exit(1)

if __name__ == "__main__":
    # Check if Pillow is installed
    try:
        from PIL import Image
    except ImportError:
        print("Error: Pillow library is required but not installed.")
        print("Install it using: pip install Pillow")
        sys.exit(1)
    
    main()