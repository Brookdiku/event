const eventDB={
    events:require('../database/event.json'),
    setEvents:function(data) {
        this.events=data;
    }
}
const getEvents =async (req,res)=>{
    return res.status(200).json({message:eventDB.events});
}
const getEvent= async (req,res)=>{
    const id = parseInt(req.params.id);
    const foundEvent=eventDB.events.find(event=>event.id===id);
    if(!foundEvent)return res.status(400).json({error:"event not found."})
    return res.status(200).json({message:foundEvent})
}
const createEvent= async (req,res)=>{
    const{title,description,eventDate,location,price,images,category}=req?.body;
}
const editEvent= async (req,res)=>{

}
const deleteEvent= async (req,res)=>{

}
module.exports={
    getEvents,
    getEvent,
    createEvent,
    editEvent,
    deleteEvent,
}