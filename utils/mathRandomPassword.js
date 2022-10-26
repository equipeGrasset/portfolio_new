function generatePassword(){
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ*!#'
    var pass = ''
    for(var i=0; i< 8; i++)
      pass += chars.charAt(Math.random() * 64)
    return pass
}
 
module.exports = { generatePassword }