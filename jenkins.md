# Jenkins

### Scripts

Too make my Jenkins instance I configured scripts made from last weeks AWS assignment.
The scripts make the instance, security group, key-pair and initialise the server with necessary software and generate key-gen key for github and show the initialAdminPassword for jenkins in console too make life easier.

Then I also have a script to delete the instance.

[This is a link to the scripts](https://github.com/bensi94/HGOP_Week2/tree/master/Day1%20-%20Jenkins).

### About Jenkins

There is now a user on Jenkins called **hgop-jenkins** and password has been submitted in canvas comments.

[Here is link to the instance](http://ec2-35-176-188-230.eu-west-2.compute.amazonaws.com:8080/)


### Jenkins file

I use ```npm install``` when initialising the CI run and that has worked out fine for me, but I heard about people having memory issues with that.

Then I have test stage where the unit test run for both client and server.

In build stage I first use jenkins environment varibles to login to docker and then I build and push my image to docker.

Then the deploy stage runs a single script ```deploy.sh``` where all other necessary scripts run as well.

### Deploy Scripts

For the most part I'm using my own scripts from last week with little tweaks here and there.

The biggest difference with my scripts from the given scripts are that they give the possibility to add extra instances for current deployment by doing ```./deploy.sh -e``` or ```./deploy.sh -extra```. Otherwise the will deploy on the oldest running instance.

They also always use the same security group if it exists or make it if necessary.

The running instances can be found in jenkins home directory along with my ```delete-aws-docker-host-instance.sh``` so they can be deleted from there.
