import axios from "axios";
import React from "react";
import '../../style/questions.scss'
import { ThreeDots } from 'react-loader-spinner'
import SunEditor, { buttonList  } from "suneditor-react";
import 'suneditor/dist/css/suneditor.min.css';
import plugins from 'suneditor/src/plugins'
// const { styles } = require( '@ckeditor/ckeditor5-dev-utils' );

class CreateLesson extends React.Component {

    state = {
        title: "",
        content: "",
        src: {},
        err: "",
        isLoding: false,
        teacher: true
    }

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    onChangeFile = e => {
        this.setState({ src: e.target.files[0] })
    }
    componentDidMount() {
        axios.get('/api/me')
            .then(res => {
                if (res.data.teacher === true) {
                    this.setState({ teacher: true })
                    setTimeout(() => { this.setState({ isLoding: false }) }, 1000)
                } else {
                    this.setState({ isLoding: false, teacher: false })
                }
            })
    }
    onSubmit = e => {
        e.preventDefault();
        if (this.state.title && this.state.content !== '') {
            const form = new FormData();
            form.append('title', this.state.title);
            form.append('content', this.state.content);
            form.append('src', this.state.src);
            const headers = ({
                'Content-Type': 'multipart/form-data',
            });
            axios.post('/lessons/create', form, headers)
                .then(res => {
                    this.setState({ isLoding: true })
                    setTimeout(() => { window.location.href = '/lessons' }, 2000)
                })
                .catch(err => {
                    this.setState({ err: err.response.data.message });
                })
        } else {
            this.setState({ err: 'يجب عليك ملئ جميع البيانات' })
        }

    }

    render() {



            if (this.state.isLoding) {
                return (
                    <div style={{ width: '100%', heigth: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <ThreeDots
                            heigth="60"
                            width="60"
                            color='rgb(22, 101, 165)'
                            ariaLabel='loading'
                        />
                    </div>

                )
            }
            if (this.state.teacher === true) {

                return (
                    <div className='Create_Lesson'>
                        <form onSubmit={this.onSubmit}>
                            <p>أضافه مقال</p>
                            {this.state.err ? <p style={{ backgroundColor: 'rgba(255,0,0,0.5)', color: 'white', padding: 10 }}>{this.state.err}</p> : ''}
                            <input type='text' name='title' onChange={this.onChange} value={this.state.title} placeholder='عنوان المقال'></input>

                            <SunEditor  setOptions={{
                                height: '100%',
                                plugins: plugins,
                                textAlign:'left',
                                buttonList:[
                                    ['undo', 'redo'],
                                    ['font', 'fontSize', 'formatBlock'],
                                    ['paragraphStyle', 'blockquote'],
                                    ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
                                    ['fontColor', 'hiliteColor', 'textStyle'],
                                    ['removeFormat'],
                                    '/', // Line break
                                    ['outdent', 'indent'],
                                    ['align', 'horizontalRule', 'list', 'lineHeight'],
                                    ['table', 'link', 'image', 'video', 'audio' /** ,'math' */], // You must add the 'katex' library at options to use the 'math' plugin.
                                    /** ['imageGallery'] */ // You must add the "imageGalleryUrl".
                                    ['fullScreen', 'showBlocks', 'codeView'],
                                    ['preview', 'print'],
                                    ['save', 'template'],
                                ],
                                
                            }} onChange={(e)=>this.setState({content:e})} />

                            <input type='file' onChange={this.onChangeFile} name='src'></input>
                            <button id='btn'>أضافه مقال</button>
                        </form>
                    </div>
                )

            }
            else {
                window.location.href = '/lessons'
            }


    }
}

export default CreateLesson;