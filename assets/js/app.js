
const URL = 'https://fakestoreapi.com/products';
    let tag = document.getElementById('goods-list');
    let searchInput = document.getElementById('search');
    let sortUp = document.getElementById('sort-up');
    let sortDown = document.getElementById('sort-down');
    let model= {
        goods : [], 
        sortDirection : null,
        searchText : '',
        async load() {
            let data = await fetch (URL);
                data= await data.json();
            this.goods = data;
            this.render();
        },
        search(st){
            this.searchText =st; 
            this.render();
        },
        sort(srt){
            this.sortDirection = srt; 
            this.render();
        },
        render(){
            let result = [...this.goods];
            // console.log(result);
            if (this.searchText){
                for (let word of this.searchText){
                    result = result.filter(function(i){
                        let letter = `${i.rating.count} ${i.rating.rate}`;
                        // i.rating = '';
                        for (let item in i){
                            if (item == 'rating'){break;}
                            letter = i[item] + ' ' + letter;
                        }
                        console.log(letter);
                        return (letter).toLowerCase().includes(word);
                        }
                    );
                }
            }
            if (this.sortDirection == 'up') {
                result = result.sort((a,b) => a.price - b.price);
            }    
            if (this.sortDirection == 'down') {
                result = result.sort((a,b) => b.price - a.price);
            } 
            tag.innerHTML = result.map(goods => `
                <div class="card mb-1" style="max-height: 45vh">
                    <div class="d-flex flex-column align-items-center justify-content-center" style="height: 30%">
                    <img src="${goods.image}" class="card-img-top" alt="..." style="max-height: 90%; max-width: 35%">
                    </div>   
                    <div class="card-body">
                        <h6 class="card-title fs-bold" style="min-height: 30%; display: -webkit-box; -webkit-line-clamp: 3;
                        -webkit-box-orient: vertical;overflow: hidden">${goods.title}</h6>
                        <p class="card-text" style="font-size: 0.8rem; display: -webkit-box; -webkit-line-clamp: 6;
                        -webkit-box-orient: vertical;overflow: hidden">${goods.description}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item text-end"> ${goods.price}</li>
                    </ul>
                </div>
            `).join('');
        }
    }
    sortUp.addEventListener('click', function(){
        model.sort('up');
    });
    sortDown.addEventListener('click', function(){
        model.sort('down');
    });
    searchInput.addEventListener('input', function(){
        model.search(searchInput.value.toLowerCase().split(' '));
    });
    model.load();