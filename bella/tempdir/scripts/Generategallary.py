import codecs
import os
from os import listdir
from os.path import isfile

from utils import *

path = 'assets/Img/Bella'
# e.g. ../../assets/Img/Bella/IMG_0021.jfif
photo_dir = f'{str(os.path.abspath(__file__))[:-41]}/{path}'
catagorytype = None
fileloc = None
QSYM = '&quot;'
dir_list = 'https://imgs.nasoj.me/'
catagory = f'{QSYM}{catagorytype}{QSYM}'
img_cata_dict = {}
img_template_list = []
dir = str(os.path.abspath(__file__))[:-41]

def listfiles(dir: str):
    return [item for item in os.listdir(dir) if isfile(f'{dir}/{item}')]

def gen_photo_list(subdir: str = ''):
    list_of_photos = []
    for img in listfiles(f'{photo_dir}{subdir}'):
        list_of_photos.append(f'{dir_list}{subdir[1:]}{"/" if subdir != "" else ""}{img}')
    return list_of_photos


class imgs():
    bellaphotos = gen_photo_list()
    naturephotos = gen_photo_list('/nature')
    foodphotos = gen_photo_list('/food')
    otherphotos = gen_photo_list('/other')

def setbgfile():
    urls = ''
    #notes removew last , from the list
    for url in imgs.bellaphotos:
        urls += f"\"url('{url}')\","
    urls = urls[:-1]
    full_template = f"""var bigSize = [{urls}];"""
    print(full_template)

setbgfile()

    

def get_img_types(img):
    type_dir = {'bella': False,
                'nature': False,
                'food': False,
                'other': False}
    if img in imgs.bellaphotos:
        type_dir['bella'] = True
    if img in imgs.naturephotos:
        type_dir['nature'] = True
    if img in imgs.foodphotos:
        type_dir['food'] = True
    if img in imgs.otherphotos:
        type_dir['other'] = True
    return type_dir


def gen_catagories_total():
    all_photos = list(gen_photo_list() + gen_photo_list('/other') + gen_photo_list('/food') + gen_photo_list('/nature'))
    for photo in remove_duplicates(all_photos):
        img_cata_dict[photo] = get_img_types(photo)

# ---------------------------THE ABOVE PART WAS TO GENERATE THE CATEGORY LIST (e.g. '../../Img/Img/Bella/1-nature.jpg': {'bella': True, 'nature': False, 'food': False, 'other': False})--------------------------------------#

def gen_cata_format(catagories: dict):
    returnstr = ''
    yeses = []
    for item, value in catagories.items():
        if value:
            yeses.append(item)
    for yes in yeses:
        returnstr += f'{QSYM}{yes}{QSYM} , '
    if returnstr[-3:] == ' , ':
        returnstr = returnstr[:-3]
    return returnstr


def gen_img_gallery():
    gen_catagories_total()
    for source_uri, catas in img_cata_dict.items():
        template = f"""      <div class="card" data-groups="[{gen_cata_format(catas)}]"><figure class="expand-effect"><img class="img-fluid" src="{source_uri}" alt="{str(gen_cata_format(catas)).replace("&quot;", '').replace(',', '')}"/></figure></div>"""
        img_template_list.append(template)


# -------- under part is to modify the file ------- #
def modify_file():
    gen_img_gallery()
    file = codecs.open(f'{dir}/bella/tempdir/template/template.html', "r", "utf-8")
    file = str(file.read())
    templiststr = ''
    for temp in img_template_list:
        templiststr += f'{temp}\n'

    new_file = file.replace('{IMAGES}', templiststr)
    with open(f'{dir}/bella/tempdir/index.html', 'w+') as newfile:
        newfile.write(new_file)

if __name__ == '__main__':
    modify_file()
