#ETRADE
top right -> customer service -> upload docs -> back and front SS card driver's license (PNG/JPEG preferred)


curl -H "Accept: text/json" https://api.ef.gy/fortune

##mac agent
DD_AGENT_MAJOR_VERSION=7 DD_API_KEY=f5f4bcc12285c51112afe1ba662d0cdb DD_SITE="datadoghq.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_mac_os.sh)"

Your Agent is running properly. It will continue to run in the
background and submit metrics to Datadog.

You can check the agent status using the "datadog-agent status" command
or by opening the webui using the "datadog-agent launch-gui" command.

If you ever want to stop the Agent, please use the Datadog Agent App or
the launchctl command. It will start automatically at login.

###UI
ng add @ng-bootstrap/ng-bootstrap

##do two triangles per side
- end width decided by whether it is top/left - right/bottom
- end width 2/8th of relevant window edge


- point 1 = 1/8th 
- point 2 = 3/8th

- point 3 = 6/8th
- point 4 = 7/8th


 0 1 2 3 4 5 6 7 

  1,1
  2,0
  0,2
  1,1s

##to do
###part1
* update centerpoint on window resize
* update content of cloud on click

###part2
* create buttons for topics
* instrument

## docker stuff
* may need -d in docker-compose command to run "detached"
* port mapping mysql
* express and angular

##DB stuff
  source /Users/scahill/Desktop/fortune-teller/fortune-teller-mysql-script.sql

  create a dump: mysqldump -u root -p --databases --column-statistics=0 fortune_teller > fortune_teller_dump.sql

  source fortune-teller-mysql-script.sql

* add to /etc/mysql/my.cnf
	- could also be /etc/mysql/conf.d/mysql.cnf
[client]
local_infile=1

may need -d in docker-compose command to run "detached"

