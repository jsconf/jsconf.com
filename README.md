# <img src="http://2015.jsconf.us/img/js-sized.png" width="40" alt="JSConf"> JSConf.com
[![Code of Conduct](https://img.shields.io/badge/%E2%9D%A4-code%20of%20conduct-blue.svg?style=flat)](CODE_OF_CONDUCT.md)

**Looking for the centralized website for JSConf events international?**<br>
You've come to the right place. Read on.

**Want to organize a JSConf event?**<br>
[Read more about involvement here](http://jsconf.com/i-want-to-run-a-jsconf.html)

**Want to update your event's status?**<br>
[Skip ahead for instructions](#how-do-i-update-my-event)

## What is JSConf?

JSConf is a unique conference organization, because we aren't really a conference organization at all. We are a very loose federation of developers who share the same general idea about how a technical conference should be held.

We have been the launching point for some of the most revolutionary products, services, and technologies on the web. We have also been the inspiration point and support base for a wide range of conferences beyond the "JSConf" name.

## How Do I Update My Event?

As an organizer or support for one of our events, you may update basic information and status for your conference by updating one of two configuration files:

-  [Official JSConf Config](conferences/jsconf.yaml)
-  [JSConf Family of Events Config](conferences/family.yaml)

These config files serve the data used to build the JSConf.com website.

### Config Options

There are a few different configuration options available for you to specify:

| Option | Description |
| --- | --- |
| `id` | The key for your Yaml entry will serve as your event's ID |
| `name` | The human readable name of your conference (also used for image `alt` attributes) |
| `description` | Tell us a little about you. This field is currently not rendered on the site. |
| `site` | URL to your conference website |
| `logo` | URL to your conference logo<br><br>**NOTE:** You can add and reference locally hosted images by submitting them into the `/public/images` directory! |
| `location` | City, state or venue for your conference (i.e., **New York, NY**) |
| `status` | Optional current status of the conference. Currently, we support two different options: <ul><li>`onsale` - highlight your event with "tickets on sale"</li><li>`inactive` - hides event from view without removing it entirely</li></ul> |

#### Example

Here is an example configuration to add in a new event that is currently on sale:

```yaml
# Subterrainean JS
- subterraineanjs:
    name: Subterrainean JS
    description: There's something great about coding underground...
    site: https://subterraineanjs.code
    logo: images/subterraineanjs.png
    location: Iceland
    status: onsale
```