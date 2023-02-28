import React from 'react';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
class CreatePost extends React.Component {
    state = {
        title: "",
        content: "وصف للسؤال او المشكله",
        err: ""
    }
    onChange = e => {

        this.setState({ [e.target.name]: e.target.value })
    }
    onSubmit = e => {
        e.preventDefault();
        if (this.state.title !== '' && this.state.content !== '') {
            let data = {
                title: this.state.title,
                content: this.state.content
            }
            axios.post('create', data)
                .then(res => {
                    window.location.href = '/post'
                })
                .catch(err => {
                    this.setState({ err: err.response.data.message })
                })
        } else {
            this.setState({ err: 'يجب عليك ادخال جميع البيانات' })
        }

    }
    render() {
        if (axios.defaults.headers.common.authorization !== null) {
            return (
                <div className='Create_Post'>
                    <form onSubmit={this.onSubmit}>
                        <p>اضافة سؤال</p>
                        {this.state.err ? <p style={{ backgroundColor: "rgba(240,40,14,0.6)", color: 'white', padding: '10px' }}>{this.state.err}</p> : ''}
                        <input maxLength='70' autoComplete='true' dir='auto' type='text' name='title' onChange={this.onChange} value={this.state.title} placeholder='(MySQL كيف يمكنني الاتصال بقاعدة بيانات ) عنوان السؤال مثال'></input>
                        <br />
                        <CKEditor

                            editor={ClassicEditor}
                            config={this.editorConfiguration}
                            data={this.state.content}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                this.setState({ content: data })
                            }}


                        />
                        <button>أضافه السؤال</button>

                    </form>
                </div>
            )
        } else {
            window.location.href = '/'
        }
    }
}

export default CreatePost;