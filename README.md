# Mirage: For all your market research needs

This project is in the very early stages. Right now it's a basic Django project. You can get started by:

 * Installing PostgreSQL (installation guides [here](https://wiki.postgresql.org/wiki/Detailed_installation_guides))
 * Installing virtualenv and creating a virtual environment
 * Installing the python requirements with ```pip install -r requirements.txt```
 * Creating a postgresql database and storing the settings in a ```local_settings.py``` file, a sibling of ```settings.py```
 * Run ```manage.py syncdb```
 * Run `manage.py runserver` to start the server 

 
 
Next you'll need to load data so that you have something to query. Inside the `/vendor/fixtures/` directory you can find several fixtures to get you started. You can load these using the `loaddata` manage command like so:

`manage.py loaddata vendor/fixtures/naics.json`

The vendors.json fixture is optional. You can either load the vendors fixture as stated above, or run the ```load_vendors``` manage command to get the most up-to-date information. 

```manage.py load_vendors```

Note that this manage command requires you to specify a ```SAM_API_KEY``` variable in your local settings file as shown in local_settings.example.py. This value should be a valid Data.gov API key.   

Once the server is started you can query the api at
`http://localhost:8000/api/vendors/`
 
Providing no query parameters will return all vendors. However you can also filter by NAICS shortcode or by setaside code.
 
For example:
`http://localhost:8000/api/vendors/?setasides=A5,QF&naics=541330`
will return vendors that have the setaside codes A5 and QF and also do business under the NAICS code 541330.

You can also add a `group` parameter to get the vendors grouped by pool, like so:
`http://localhost:8000/api/vendors/?setasides=A5,QF&naics=541330&group=pool`

