# The Botanical App
#### Incomplete prototype app designed to help with the growth and upkeep of houseplants

## How to run:
This project is set up using a Docker container as a development environment, using the Visual Studio Code Remote - Containers extension. 
To run this project, first set up the extension using the instructions [here](https://code.visualstudio.com/docs/remote/containers). Then [load the folder as a container](https://code.visualstudio.com/docs/remote/containers#_quick-start-open-an-existing-folder-in-a-container) and wait for the container to build and install all dependencies (this will take several minutes). 
Once it's done, open a new terminal in Visual Studio Code and run the command `ionic serve --external`. It will prompt you to install `@angular/cli`, type `Y` and press enter. It may take a couple minutes for everything to install and compile. When it's ready you'll see a message in the terminal similar to this: 

    [INFO] Development server running!
       
           Local: http://localhost:8100
           External: http://172.17.0.2:8100
       
           Use Ctrl+C to quit this process

    [INFO] Browser window opened to http://localhost:8100!

    [INFO] ... and 78 additional chunks
    [ng] ℹ ｢wdm｣: Compiled successfully.

In a web browser of your choice, open a new tab and go to the External URL shown in the terminal. In this example, that URL is `http://172.17.0.2:8100`. If everything is working as it should, you will see the app demo running in this browser tab. 

There will be a lot of missing content in the app, most notably the Catalog tab. This is because data for the app was being stored on a database at our project's URL, http://botanicalapp.com, which is no longer online.

The main source code for an Ionic project like this is stored in the src/app folder. Here you will find each of the pages, as well as the data handler service used to retrieve data from the website. 

### You are more than welcome to use this code as a reference, but be aware that it is a few years old and there are most likely better methods of doing things than what's in here. Take everything here with a grain of salt, but I hope it can be of use in some way. If you have any questions, feel free to contact me at gannon.kolding@gmail.com.
