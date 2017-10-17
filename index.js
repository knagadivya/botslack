var Botkit = require('botkit')

var token = process.env.SLACK_TOKEN || "xoxb-257905074663-RMrlzWD7173TG4MlKqvrARsy"

var controller =Botkit.slackbot({
	retry:Infinity,
	debug: false
})

if(token){
	console.log('Starting in single-team mode')
	controller.spawn({
		token: token
	}).startRTM(function(err,bot,payload){
		if(err){
			throw new error(err)
		}
		console.log('Connected to Slack RTM')
	})
} else {
	console.log('Starting in Beep Boop multi-team mode')
	require('beepboop-botkit').start(controller,{debug: true})
}
controller.on('bot_channel_join',function(bot,message){
	bot.reply(message,"I'M here!")
})
controller.hears(['hi'],['ambient','direct_message','direct_mention','mention'],function (bot,message){
	bot.reply(message,'Hello.')
})
