import os
from os import *
from tkinter import *
from PIL import Image
from PIL.ExifTags import TAGS

path = 'assets/Img/Bella'
catagorytype = None
fileloc = None
root = Tk()
QSYM = '&quot;'
dir_list = '../../assets/Img/Bella/'
catagory = f'{QSYM}{catagorytype}{QSYM}'
template = f"""      
<div class="card" data-groups="[{catagory}]"><figure class="expand-effect"><img class="img-fluid" src="{fileloc}" alt="{catagorytype}"/></figure></div>
"""
photos = listdir('../assets/Img/Bella')

def gen_photo_list(subdir: str = ''):
    list_of_photos = []
    for img in listdir(f'../assets/Img/Bella{subdir}'):
        list_of_photos.append(f'{dir_list}{img}')
    return list_of_photos


def gen_catagories_total():
    all_photos = list(gen_photo_list() + gen_photo_list('/other') + gen_photo_list('/food') + gen_photo_list('/nature'))
    for photo in all_photos:
        if os.getxattr(photo, 'bella.catagories'):
            continue


print(gen_catagories_total())


def gen_catagories():
    for bella_photo in gen_photo_list():
        setxattr(bella_photo, 'bella.catagories.bella', 'true')
    for other_photo in gen_photo_list('/other'):
        setxattr(other_photo, 'bella.catagories.other', 'true')
    for food_photo in gen_photo_list('/food'):
        setxattr(food_photo, 'bella.catagories.food', 'true')
    for nature_photo in gen_photo_list('/nature'):
        setxattr(nature_photo, 'bella.catagories.nature', 'true')


# TODO add a tkiner window that has a simple catagory selector and the img (select all that apply)
# TODO but first check metadata to see if it was allready done

def gen_template_list():
    photo_list = gen_photo_list()
    catagory_list = gen_catagories()
