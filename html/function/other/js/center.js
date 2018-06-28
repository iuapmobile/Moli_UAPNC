
function changeIcon(){
	var icon = $("#icon");
	UM.actionsheet({
        title: '选择照片',
        items: ['从图库中选择', '照相'],
        callbacks: [function () {
            summer.openPhotoAlbum({
                "callback" : function(args){
                    //alert(args.imgPath); //图片路径，类型为string
                    icon.attr("src", args.imgPath);
                 }
            })
        }, function () {
            summer.openCamera({
                "callback" : function(args){
                    //alert(args.imgPath); //图片路径，类型为string
                    icon.attr("src", args.imgPath);
                }
            });
        }]
    });
}