//Dependencies
const Domain_Scan = require("domain-scanner")
const JSON_Hood = require("json-hood")
const Fs = require("fs")

//Variables
const Self_Args = process.argv.slice(2)

const DS_Options = {
    deep: true,
    sections: ["details", "breaches", "emails", "certificate", "subdomains", "threats"],
    exclude: ["robots"]
}
  
//Main
if(!Self_Args.length){
    console.log("node index.js <domain> <output>")
    process.exit()
}

if(!Self_Args[1]){
    console.log("Invalid output.")
    process.exit()
}

console.log("Scanning the website, please wait(This might take a while).")
Domain_Scan(Self_Args[0], DS_Options, (err, results)=>{
    if(err){
        console.log("Invalid domain.")
        process.exit()
    }

    console.log(`Saving the results to ${Self_Args[1]}`)
    Fs.writeFileSync(Self_Args[1], JSON_Hood.getJSONasArrowDiagram(results), "utf8")
    console.log(`Results successfully saved to ${Self_Args[1]}`)

    JSON_Hood.printJSONasArrowDiagram(results)
    process.exit()
})