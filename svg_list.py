import os
import json

def get_svg(directory):
    svg_files = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.svg'):
                relative_path = os.path.relpath(os.path.join(root, file), directory)
                relative_path = relative_path.replace(os.sep, '/')
                svg_files.append(relative_path)
    
    svg_files.sort()
    
    return svg_files

directory_path = 'icons/'

svg_files = get_svg(directory_path)

output_file = 'icons.json'
with open(output_file, 'w') as f:
    json.dump(svg_files, f, indent=4)

print("Done")
