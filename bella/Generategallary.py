from PIL import Image
from PIL.ExifTags import TAGS

path = 'assets/Img/Bella'

template = """
            div>
                <img data-u="image" src="{image}"  alt="{alt}"/>
            </div>

"""


def add_metadata(img, alt: str):
    # read the image data using PIL
    image = Image.open(img)
    exifdata = image.getexif()
    # iterating over all EXIF data fields
    for tag_id in exifdata:
        # get the tag name, instead of human unreadable tag id
        tag = TAGS.get(tag_id, tag_id)
        data = exifdata.get(tag_id)
        # decode bytes
        if isinstance(data, bytes):
            data = data.decode()
        print(f"{tag:25}: {data}")


def gen_img(img: str, alt: str):
    pass
