from os.path import abspath

# File paths
old_version = 1.25

dir = str(abspath(__file__))[:-16]

fps = [f'{dir}index.html', f'{dir}sw.js', f'{dir}package.json', f'{dir}src/main.ts', f'{dir}updateversion.py']
#  "version": "1.25",

for file in fps:
    print(file)
    # Read in the file
    with open(file, 'r') as file_d1:
        filedata = file_d1.read()
    # Replace the target string
    filedata = filedata.replace(str(old_version), str(old_version + 0.01))

    # Write the file out again
    with open(file, 'w') as file_d2:
        file_d2.write(filedata)
