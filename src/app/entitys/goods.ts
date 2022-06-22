export interface Goods{
goodsId?:number;
    goodsTitle?:string ;
    goodsPic?:string;
    goodsDes?:string;
    comment?:string;
    encryptedLink?:string;
    category?:string;
    residue?:number;
    originalPrice?:number;
    currentPrice?:number;
    salesNumber?:number;
    modifyDate?:Date;
    skipLinkSecret?:string;
}

// export const goodsone:Goods={
//     goodsId:123,
//     goodsTitle:'庆翠堂美妆洗护【笑笑姐推荐】庆翠堂白参控油滋养发水400ml有',
//     goodsPic:'https://gd1.alicdn.com/imgextra/i3/2200641045810/O1CN01pfW3DM1sn1rw5PlUg_!!2200641045810.jpg_400x400.jpg-https://gd2.alicdn.com/imgextra/i2/2200641045810/O1CN013ktuNQ1sn1rw5SNfD_!!2200641045810.jpg_400x400.jpg-https://gd1.alicdn.com/imgextra/i1/2200641045810/O1CN01YgZNA51sn1rrxRz3Y_!!2200641045810.jpg_400x400.jpg-https://gd4.alicdn.com/imgextra/i4/2200641045810/O1CN012AP26z1sn1rtVwo3v_!!2200641045810.jpg_400x400.jpg',
//     goodsDes:'颜值实在太高了 ，从来没有尝试过粉色，看这这个配色后，尽然有勇气去尝试了，成功的吸引到我了。 本人250mm的脚，刚刚好，一开始可能还没习惯，鞋子的鞋垫和我的脚掌不贴合，跳绳跑步的时候有点累、酸。后来逐渐适应了，这些不适症状都没了。现在穿着非常贴合。',
//     comment:'颜值实在太高了 ，从来没有尝试过粉色，看这这个配色后，尽然有勇气去尝试了，成功的吸引到我了。 本人250mm的脚，刚刚好，一开始可能还没习惯，鞋子的鞋垫和我的脚掌不贴合，跳绳跑步的时候有点累、酸。后来逐渐适应了，这些不适症状都没了。现在穿着非常贴合。',
//     encryptedLink:'string',
//     category:'美妆',
//     residue:98,
//     originalPrice:120,
//     currentPrice:98,
//     salesNumber:99,
// }