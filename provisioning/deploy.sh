EXTRA_INSTANCE=$1

if [[ $EXTRA_INSTANCE == '-extra' || $EXTRA_INSTANCE == '-e' || ls -l ~/runningInstances | grep -c ^d == 0 ]]; then

    #Create instance
    ./create-aws-docker-host-instance.sh

    #Get the directory we just made
    INSTANCE_ID=$(ls -lt . | grep  ^d -m 1 | rev | cut -d ' ' -f 1 | rev)

else
    #Get the oldest directory
    INSTANCE_ID=$(ls -lrt . | grep  ^d -m 1 | rev | cut -d ' ' -f 1 | rev)
fi

GIT_COMMIT=$(cat ../build/githash.txt)

deploy-on-instance.sh INSTANCE_ID  GIT_COMMIT