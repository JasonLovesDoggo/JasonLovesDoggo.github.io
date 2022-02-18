from collections import OrderedDict


def remove_duplicates(l: list):
    return list(OrderedDict.fromkeys(l))