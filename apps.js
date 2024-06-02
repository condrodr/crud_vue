var app = new Vue({
    el: '#app',
    data: {
        alertMessage: '',
        info: [],
        newItem: {
            nim: '',
            nama: '',
            jk: '',
            prodi: ''
        },
        editItem: {
            id: '',
            nim: '',
            nama: '',
            jk: '',
            prodi: ''
        },
        showAddForm: false,
        showEditForm: false,
        showData: false
    },
    methods: {
        toggleData() {
            this.showData = !this.showData;
            if (this.showData) {
                this.tampildata();
            }
        },
        toggleAddForm() {
            this.showAddForm = !this.showAddForm;
            this.showEditForm = false;
        },
        toggleEditForm() {
            this.showEditForm = !this.showEditForm;
            this.showAddForm = false;
        },
        tampildata() {
            console.log('Fetching data...');
            axios.post('database.php', {
                request: 1,
            })
            .then(response => {
                console.log('Data fetched:', response.data);
                this.info = response.data;
            })
            .catch(error => console.log('Error fetching data:', error));
        },
        hapus(index, id) {
            console.log('Deleting item with ID:', id);
            axios.post('database.php', {
                request: 2,
                id: id
            })
            .then(response => {
                console.log('Item deleted:', response);
                this.info.splice(index, 1);
                this.alertMessage = 'Data berhasil dihapus.';
                setTimeout(() => this.alertMessage = '', 3000); // Alert will disappear after 3 seconds
            })
            .catch(error => console.log('Error deleting item:', error));
        },
        tambahdata() {
            console.log('Adding item:', this.newItem);
            axios.post('database.php', {
                request: 3,
                nim: this.newItem.nim,
                nama: this.newItem.nama,
                jk: this.newItem.jk,
                prodi: this.newItem.prodi,
            })
            .then(response => {
                console.log('Item added:', response.data);
                this.info.push(response.data);
                this.newItem = {
                    nim: '',
                    nama: '',
                    jk: '',
                    prodi: ''
                };
                this.alertMessage = 'Data berhasil ditambahkan.';
                setTimeout(() => this.alertMessage = '', 3000); // Alert will disappear after 3 seconds
                this.showAddForm = false; // Hide the add form
            })
            .catch(error => {
                console.log('Error adding item:', error);
                console.log('Response:', error.response);
            });
        },
        openEditForm(item) {
            console.log('Opening edit form for item:', item);
            this.editItem = { ...item };
            this.showEditForm = true;
            this.showAddForm = false;
        },
        editsave() {
            console.log('Saving edits for item:', this.editItem);
            axios.post('database.php', {
                request: 4,
                id: this.editItem.id,
                nim: this.editItem.nim,
                nama: this.editItem.nama,
                jk: this.editItem.jk,
                prodi: this.editItem.prodi,
            })
            .then(response => {
                console.log('Item edited:', response.data);
                const index = this.info.findIndex(ang => ang.id === this.editItem.id);
                this.$set(this.info, index, this.editItem);
                this.editItem = {
                    id: '',
                    nim: '',
                    nama: '',
                    jk: '',
                    prodi: ''
                };
                this.alertMessage = 'Data berhasil diedit.';
                setTimeout(() => this.alertMessage = '', 3000); // Alert will disappear after 3 seconds
                this.showEditForm = false; // Hide the edit form
            })
            .catch(error => {
                console.log('Error editing item:', error);
                console.log('Response:', error.response);
            });
        }
    }
});
