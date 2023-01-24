<script>

import { reactive } from 'vue';
import { useDataStore } from '../stores/data'
import { mapActions, mapState } from 'pinia'
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from 'yup';
import axios from "axios"

const url= import.meta.env.VITE_SERVERURL

export default {
    components: {
        Form,
        Field,
        ErrorMessage
    },
    data(){
        const mySchema = yup.object({
            nombre: yup.string().required().min(2).max(50),
            ISBN: yup.string().required().length(10),
            tema: yup.string().required(),
            autor: yup.string().required(),
            desc: yup.string(),
            img: yup.string()
        })
        return {
            book: {},
            mySchema 

        }
    },
    computed: {
        ...mapState(useDataStore, {
            temas: 'temas',
            autores: 'autores'
        })
    },
    async mounted() {
        if(this.$route.params.id) {
            try {
                let response = await axios.get(url + '/libros/' + parseInt(this.$route.params.id))
                this.book = response.data
            } catch(error) {
                alert('Error ' + error)
            }
        }

    },
    methods: {
        ...mapActions(useDataStore, ['addBook', 'editBook']),
        addOrEditBook(values) {
            if(this.book.id) {
                this.editBook(values)
            } else {
                this.addBook(values)
            }
            this.$router.push('/books')
        }
    }
}


</script>

<template>
    <div class="row">
    <Form  :initial-values="book" id="new-book" class="col-6" @submit="addOrEditBook" :validation-schema="mySchema">
        <fieldset>
            <legend id="book-form-tittle" class="bg-dark text-white text-center"> {{this.$route.params.id ? 'Editar' : 'Nuevo'}} libro</legend>
            <div class="form-group">
                <label for="newbook-id">ID:</label>
                <Field type="text" name="id" class="form-control" id="newbook-id" disabled/>
                <ErrorMessage name="id" />
            </div>
            <div class="form-group">
                <label for="newbook-name">Nombre:</label>
                <Field type="text" name="nombre" id="newbook-name" class="form-control" maxlength="50" minlength="5" required/>
                <ErrorMessage name="nombre" />
            </div>
            <div class="form-group">
                <label for="newbook-cat">Tema:</label>
                <Field as="select" name="tema" id="newbook-cat" class="form-control" required>
                    <option value="" disabled selected>--Seleccione categoría--</option>
                    <option v-for="elem in temas" :key="elem.id" :value="elem.id">{{ elem.nombre }}</option>
                </Field>
                <ErrorMessage name="tema" />
            </div>
            <div class="form-group">
                <label for="newbook-aut">Autor:</label>
                <Field as="select" name="autor" id="newbook-aut" class="form-control" required>
                    <option value="" disabled selected>--Seleccione categoría--</option>
                    <option v-for="elem in autores" :key="elem.id" :value="elem.id">{{ elem.nombre }}</option>
                </Field>
                <ErrorMessage name="autor" />
            </div>
            <div class="form-group">
                <label for="newbook-isbn">ISBN:</label>
                <Field name="ISBN" type="text" inputmode="numeric" id="newbook-isbn" class="form-control" minlength="10" maxlength="10"/>
                <ErrorMessage name="ISBN" />
            </div>
            <div class="form-group">
                <label for="newbook-desc">Descripción:</label>
                <Field as="textarea" name="desc" type="text" id="newbook-desc" class="form-control"/>
                <ErrorMessage name="desc" />
            </div>
            <div class="form-group">
                <label for="newbook-img">Imagen:</label>
                <Field name="img" type="text" id="newbook-img" class="form-control" required/>
                <ErrorMessage name="img" />
            </div>
            <br>
            <button type="submit" class="btn btn-default btn-dark">{{this.$route.params.id ? 'Editar' : 'Añadir'}}</button>
            <button type="reset" class="btn btn-danger">Reset</button>
        </fieldset>
    </Form>
    </div>
</template>