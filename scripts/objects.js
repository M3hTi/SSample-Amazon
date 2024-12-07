const cart  = {
    products: [],
    total: 0,
    add : function(obj){
        this.products.push(obj)
    },
    calculateTotal : function(){
        this.total = 0
        this.products.forEach(element => {
            this.total += element.price * element.number 
        })
        return this.total
    }
}








function Product (name, price,image,number,id){
    this.name = name
    this.price = price
    this.image = image
    this.number = number
    this.id = id
}
