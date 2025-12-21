const express = require('express');
const bodyParser = require('body-parser');
const supabaseClient = require('@supabase/supabase-js');
const dotenv = require('dotenv');

const app = express();
const port = 3000;
dotenv.config();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

// Initalizinfg Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);




app.get('/user', async (req, res) => {
    console.log('Attemping to GET all users');
    
    const { data, error } = await supabase.from('user').select();

    if (error) {
        console.error(`Error: ${error}`);
        res.statusCode = 500;
        res.send(error);    
    } else {
        res.send(data)
    }
});


app.get('/api/getDanbooruData', async (req, res) => {
    try {
        const { tag, single_post } = req.query;
        const postsLink = `https://danbooru.donmai.us/posts`;
        const privateKey = process.env.DANBOORU_KEY;

        const baseLink = (single_post == "true")
            ? `${postsLink}/${tag}.json${privateKey}`
            : `${postsLink}.json${privateKey}`;

        const url = (tag && (!single_post || single_post == "false"))
            ? `${baseLink}&tags=rating:general ${tag.toLowerCase().replaceAll(" ", "_")}`
            : baseLink;

        const response = await fetch(url);
        const artData = await response.json();
        res.send(artData);
    } catch(error) {
        console.error("Danbooru fetch failed:", error);
    }
});



app.post('/user', async (req, res) => {
    console.log('Adding user');
    console.log('Request:', req.body)

    const firstName = req.body.firstName;
    const font = req.body.font;
    const theme = req.body.theme;


        const { data, error } = await supabase.from('user').insert({
        user_first_name: firstName,
        user_font: font,
        user_theme: theme
        })
        .select();

        if (error) {
        console.error(`Error: ${error}`);
        res.statusCode = 500;
        res.send(error);    
        } else {
        res.send(data)
        }

    res.send(req.body);
})


app.listen(port, () => {
  console.log(`App is available on port: ${port}`);
});