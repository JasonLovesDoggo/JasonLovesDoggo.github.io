from os.path import abspath

# File paths
old_version = 1.19

dir = str(abspath(__file__))[:-16]

fps = [f'{dir}index.html', f'{dir}sw.js', f'{dir}package.json', f'{dir}src\main.ts']
#  "version": "1.19",

for file in fps:
    print(file)
    # Read in the file
    with open(file, 'r') as file:
        filedata = file.read()
    # Replace the target string
    filedata = filedata.replace(str(old_version), str(old_version + 0.01))

    # Write the file out again
    with open(file, 'w+') as file:
        file.write(filedata)
