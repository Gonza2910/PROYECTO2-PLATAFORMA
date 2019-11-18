class Request {
	constructor (url) {
		this.url = url 
	}

	async getData () {
		document.getElementClassName('vid')[0]..innerHTML = 'Cargando...'
		return await $.ajax ( {
			url : this.url,
			data : { id : 123},
			type : 'GET',
			dataType : 'json',

			success: (json) => {
				document.getElementById('vid')[0].innerHTML=''
				console.log('ajax')
			},
			error: (xhr, status) => {
				alert('Disculpe, existió un prblema');

			},
			complete : (xhr, status) => {
				console.log("completado")
			}
		});
	}
}

class Video {
	constructor () {
		this.itemVideo=''
		this.titleVideo=''
	}

	set item (item) {
		this.itemVideo = item
	}

	set title (title) {
		this.titleVideo = title
	}
}

class VideoContainer extends Request {
	constructor (url){
		super(url)
		this.videos = []
	}

	async fillData (){
		const DATA = await this.getData()
		this.videos = DATA.data
	}

	async printData (){
		await this.fillData()
		this.videos.map(video =>{
			console.log(video.item)
			const HTMLprint = '<div class="vid"><a href="index2.html"><iframe width="100%" height="100%" src="'+video.item+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><h2> '+video.title+' </h2></a></div>'
		    document.getElementByClassName('vid')[0].insertAdjacentHTML( 'beforeend', HTMLprint )
		})
	}

	async search (name) {
		name = name.tolowerCase().trim()
		await this.fillData()
		this.videos.map(place => {
			let busqueda = video.title.tolowerCase()
			console.log(name)
			console.log(busqueda)
			if (name==busqueda) {
				console.log(video)
				const HTMLprint = '<div class="vid"><a href="index2.html"><iframe width="100%" height="100%" src="'+video.item+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><h2> '+video.title+' </h2></a></div>'
				document.getElementByClassName('vid')[0].insertAdjacentHTML( 'beforeend', HTMLprint )
			}else{
				document.getElementByClassName('vid')[0].innerHTML = 'No hay resultados'	
			}
		})
	}
}

$(document).ready(() => {
	const REQUEST_OBJ = new VideoContainer('https://api.myjson.com/bins/n0iki')
	REQUEST_OBJ.printData()
})

function search(e) {
	e.preventDefault()
	const searchText = document.getElementById('miBusqueda').value
	const REQUEST_OBJ=new VideoContainer('https://api.myjson.com/bins/n0iki')
    REQUEST_OBJ.search(searchText)
}