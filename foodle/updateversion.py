from os.path import abspath

# File paths

old_version_decimal = 0
VERSION_NUMBER = 2
if old_version_decimal != 99:
    new_version = f'{VERSION_NUMBER}.{old_version_decimal + 1}'
else:
    new_version = f'{VERSION_NUMBER + 1}.0'
old_version = f'{VERSION_NUMBER}.{old_version_decimal}'

print('Old Version:', old_version)
print('New Version:', new_version)

direct = str(abspath(__file__))[:-16]
fps = [f'{direct}index.html', f'{direct[:-7]}foodle_sw.js', f'{direct}package.json', f'{direct}src/main.ts',
       f'{direct}updateversion.py', f'{direct[:-7]}api\\data\\version.json']
#  "version": "2.0",


for file in fps:
    print(file, ': Modified')
    # Read in the file
    with open(file, 'r') as file_d1:
        filedata = file_d1.read()
    # Replace the target string
    if old_version_decimal == 99:
        filedata = filedata.replace(f'VERSION_NUMBER = {VERSION_NUMBER}', f'VERSION_NUMBER = {VERSION_NUMBER + 1}')
        filedata = filedata.replace(f'old_version_decimal = {old_version_decimal}', f'old_version_decimal = {"0"}')
        filedata = filedata.replace(old_version, new_version)

    else:
        filedata = filedata.replace(f'old_version_decimal = {old_version_decimal}',
                                    f'old_version_decimal = {old_version_decimal + 1}')

        filedata = filedata.replace(old_version, new_version)

    # Write the file out again
    with open(file, 'w') as file_d2:
        file_d2.write(filedata)
