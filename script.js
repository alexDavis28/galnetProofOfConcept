var scanlines = $('.scanlines');
var tv = $('.tv');
var divider = "----------------------------------------------"
var greeting_text = 
`  _____          _      _   _ ______ _______ 
 / ____|   /\\   | |    | \\ | |  ____|__   __|
| |  __   /  \\  | |    |  \\| | |__     | |   
| | |_ | / /\\ \\ | |    | . \` |  __|    | |   
| |__| |/ ____ \\| |____| |\\  | |____   | |   
 \\_____/_/    \\_\\______|_| \\_|______|  |_|   
Welcome Lancer
Enter 'help' to view commands`

var help_texts = [
    ["help", "List available commands"],
    ["ls", "Lists available documents"],
    ["read <index>", "Open a document"],
    ["clear", "Clears the terminal"]
];

var documents = [
    {
        "title": "Background",
        "text": "The campaign takes place at the edge of the Long Rim, a corridor of space devoid of most things. While most people don't travel this part of the System, it has become a popular trade route for the Karrakin Trade Baronies (KTB). While usually somewhat amicable, there has been friction between multiple houses over the past few years over something highly classified. Nobody outside of the baronies knows what this issue is. As a result, many people are taking advantage of the situation, leading to an increase in piracy and disturbance across the Long Rim, with raids on ships and supplies getting more common each day. This is beginning to affect some of the planets in the system that heavily rely on this trade route, resulting in more tension between the houses.\nThe game begins on the Gaia Space station in the Liren system (the closest system to the Long Rim / Karrakin Baronies), orbiting the aqueous planet Aonope. A call has come in recently of a Barony owned space ship drifting aimlessly through the orbit. It is non-responsive and the Union is growing worried.\nMain houses involved are Smoke, Rememberance and Sand."
    }
];


var terminal = $('body').terminal({
    help: function() {
        const padding_width = 16;
        var header = "Command         Description"
        this.echo(header);
        this.echo("-".repeat(header.length));
        for (let i = 0; i < help_texts.length; i++) {
            const element = help_texts[i];
            const cmd = element[0];
            const text = element[1];
            var padding = " ".repeat(padding_width - cmd.length);
            this.echo(cmd + padding + text);
        }
    },
    echo: function(arg1) {
        this.echo(arg1);
    },
    ls: function() {
        // Note 4 spaces for split
        var header = "Index    Title"
        this.echo(header);
        this.echo("-".repeat(header.length));
        for (let i = 0; i < documents.length; i++) {
            var padding = 9 - i.toString().length;
            const document = documents[i];
            this.echo(""+(i+1)+" ".repeat(padding)+document["title"]);
        }
    },
    read: function(index) {
        try {
            this.echo(`[[bu;;]`+documents[index-1]["title"]+`]\n`);
            this.typing("echo", "10", documents[index-1]["text"]);
        }
        catch(err) {
            this.echo('[[;red;]Index not found!]');
        }
    },
    test: function() {
        this.typingOut("Hello world!")
    }
}, { prompt: '$ ', greetings: false, onInit: function() {
        this.echo(divider);
        this.echo(greeting_text);
        this.echo(divider);
    }
}
);