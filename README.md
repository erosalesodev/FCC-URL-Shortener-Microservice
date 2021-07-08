# Solution to URL Shortener Microservice from Free Code Camp
[Challenge Link](https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/url-shortener-microservice)

## Description
<section id='description'>
Build a full stack JavaScript app that is functionally similar to this: <a href='https://url-shortener-microservice.freecodecamp.rocks/' target='_blank'>https://url-shortener-microservice.freecodecamp.rocks/</a>.
  
  ### Forked from
<a href='https://github.com/freeCodeCamp/boilerplate-project-urlshortener/' target='_blank'>https://github.com/freeCodeCamp/boilerplate-project-urlshortener/</a>
  
## User Stories:

- I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
- If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.
- When I visit that shortened URL, it will redirect me to my original link

## Valid URL format
>http://www.example.com

## Example Usage:
`Example: POST [project_url]/api/shorturl - https://www.google.com`
  `[this_project_url]/api/shorturl/3`

## Example Output

  `{
  "original_url": "https://www.google.com",
  "short_url": 1
}`
  <hr>


