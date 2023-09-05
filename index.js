<!DOCTYPE html>
<html>
    <head>
        <title>SWE632 Mapper</title>
        
        <!-- UiKit -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.16.24/css/uikit.min.css" integrity="sha512-NcmV7IV+qizfpgTaTg1WzUZiBdDZfC4+AEg9Fh845oz6DbZNrYVqv9V09Tvrw49UdhGSISB3VqYMRSUBwOfxOA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.16.24/js/uikit.min.js" integrity="sha512-GuBLLhqyTuc7b3Iup+mC6aihg2+yVeq//7p79RDG64zDKabYKQlVhuO7I+aKYCBVyHraSEHz/LNO2x9Gs6ayNA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/uikit/3.16.24/js/uikit-icons.min.js" integrity="sha512-pca9avNkoc85j1HMRuksRgpT4KMZOx88McJyQaO01Rt6v2gzRpz1634urrXntjUTnSE/g/IkiKvUp3IHSPlmmg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        
        <!-- Leaflet -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css" integrity="sha512-Zcn6bjR/8RZbLEpLIeOwNtzREBAJnUKESxces60Mpoj+2okopSAcSUIUOseddDm0cxnGQzxIR7vJgsLZbdLE3w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js" integrity="sha512-BwHfrr4c9kmRkLw6iXFdzcdWV/PGkVgiIyIWLLlTSXzWQzxuSg4DiQUCpauz/EWjgk5TYQqX/kvn9pG1NpYfqg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        
        <link rel="stylesheet" href="SWE632_app.css" />
        
    </head>
    
    <body class="uk-height-viewport uk-width-1-1" uk-grid>
        
        <div class="uk-width-1-6"></div>
    
        <div class="uk-height-viewport uk-width-2-3">
            <div class="uk-flex uk-flex-row uk-padding">
                <button class="ui-button-primary">Options</button>
            </div>
            
            <div class="uk-height-1-1 uk-width-1-1 uk-margin">
                <div id="map" class="uk-height-1-1 uk-width-1-1"></div>
            </div>
        </div>
        
        <div class="uk-width-1-6"></div>
        
        <script src="SWE632_app.js"></script>
        
    </body>
    
</html>

