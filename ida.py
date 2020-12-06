import random

from iottalkpy.dan import NoData

### The registeration api url, you can use IP or Domain.
api_url = 'http://140.113.199.211:8080/csm'  # default
# api_url = 'http://localhost/csm'  # with URL prefix
# api_url = 'http://localhost:9992/csm'  # with URL prefix + port

### [OPTIONAL] If not given or None, server will auto-generate.
# device_name = 'Dummy_Test'

### [OPTIONAL] If not given or None, DAN will register using a random UUID.
### Or you can use following code to use MAC address for device_addr.
# from uuid import getnode
# device_addr = "{:012X}".format(getnode())
# device_addr = "..."

### [OPTIONAL] If the device_addr is set as a fixed value, user can enable
### this option and make the DA register/deregister without rebinding on GUI
# persistent_binding = True

### [OPTIONAL] If not given or None, this device will be used by anyone.
# username = 'myname'

### The Device Model in IoTtalk, please check IoTtalk document.
device_model = 'Dummy_Device'

### The input/output device features, please check IoTtalk document.
idf_list = ['Dummy_Sensor']
odf_list = ['Dummy_Control']

### Set the push interval, default = 1 (sec)
### Or you can set to 0, and control in your feature input function.
push_interval = 3  # global interval
interval = {
    'Dummy_Sensor': 1,  # assign feature interval
}


def on_register():
    print('register successfully')


def Dummy_Sensor():
    return random.randint(0, 100)

    # Or you want to return nothing.
    # Note that the object `None` is treated as normal data in IoTtalk
    #
    # return NoData


def Dummy_Control(data, glo):  # data is a list
    print(glo)
    glo = str(data[0])
    f_write = open('data.txt', 'r+')
    print(glo, file=f_write)
    f_write.close()
    # print(glo)
    return glo
