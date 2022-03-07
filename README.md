![GitHub repo size](https://img.shields.io/github/repo-size/JakeWasChosen/website.svg)
[![pages-build-deployment](https://github.com/JakeWasChosen/JakeWasChosen.github.io/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/JakeWasChosen/JakeWasChosen.github.io/actions/workflows/pages/pages-build-deployment)
[![Update Sitemap](https://github.com/JakeWasChosen/JakeWasChosen.github.io/actions/workflows/UpdateSitemap.yml/badge.svg)](https://github.com/JakeWasChosen/JakeWasChosen.github.io/actions/workflows/UpdateSitemap.yml)
[![UpdateVersion](https://github.com/JakeWasChosen/JakeWasChosen.github.io/actions/workflows/updateversion.yml/badge.svg?branch=master)](https://github.com/JakeWasChosen/JakeWasChosen.github.io/actions/workflows/updateversion.yml)
# My personal website / portfolio

#### hosted via GitHub pages and uses cloudflare dns and a namecheap domain                                                                                                                       (thank you github student pack)

### [URL](https://nasoj.me)

The /projects page was generated with GitFolio

The /Bella page's photos are stored backblaze bucket (did a bit of cloudflare reworking to make it look better)
 
                                  
                                  
````
 cd foodle
npm run build
````
                                     
```
cd ./projects
gitfolio update
``` 


<details>
<summary>TODO</summary>
<br>
1. Make the /Bella page (currently /bella/tempdir) a smooth/long scrolling page (start with a static looking page then prompt the user to scroll) 
see https://pixieset.com/example/ for more examples

2. Add a contact form on the foodle page using formspree
   1. Fix css
   2. Fix logo and calling locations
                             		<GameIcon onClick={() => dispatch("contact")}>
			<path
				d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z"></path>
		</GameIcon>
</details>