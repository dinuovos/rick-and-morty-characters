export default function changeState(url:string,isFav?:boolean|undefined){
    // @ts-ignore
    let $self = this;
    let modalDialog = document.getElementById('modal-dialog-wait') as HTMLDialogElement;
    let modalDialogError = document.getElementById('modal-dialog-error') as HTMLDialogElement;
    modalDialog.style.display="flex";
    let URLa = new URL(url);
    let searchParams3 = new URLSearchParams(URLa.search);
    let page = searchParams3.has('page') ? +(searchParams3.get('page') || 1)  : 1;
    fetch(url)
        .then(async res=>{
            if(res.status !== 200) {
                modalDialog.style.display="none";
                $self.setState({errorString:"error 404: bad parameters"});
                modalDialogError.showModal();
                return;
            }
            let data = await res.json();
            if(!isFav)
                $self.setState({info:data.info,results:data.results,page});
            else
                $self.setState({results:Array.isArray(data) ? data : [data]});
            modalDialog.style.display="none";
        })
        .catch(err=>{
            modalDialog.style.display="none";
            console.error(err);
            $self.setState({errorString:err.toString()});
            modalDialogError.showModal();
        })
}