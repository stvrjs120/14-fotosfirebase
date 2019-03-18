export class FileItem {

    public archivo: File;
    public nombreArchivo: string;
    public url: string;
    public loading: boolean;
    public progress: number;

    constructor(archivo: File) {
        this.archivo = archivo;
        this.nombreArchivo = archivo.name;

        this.loading = false;
        this.progress = 0;
    }

}
