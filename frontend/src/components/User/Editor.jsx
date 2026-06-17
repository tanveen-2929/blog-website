import { CKEditor } from '@ckeditor/ckeditor5-react';
import { ClassicEditor, Bold, Underline , Essentials, Italic, Mention, Paragraph, Undo,Link
     ,List,Heading,BlockQuote,Font  } from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';

function Editor({setContent,text}) {    //jdo mai import krugi eh function nu te do cheeja dsniya pain giya content te text
    return (
        <CKEditor
            editor={ ClassicEditor }   //for free 
            config={ {
                toolbar: [
                    'undo',
                    'redo',
                    'heading',
            '|',
            'bold',
            'italic',
            'underline',
            'fontSize',
            'fontFamily',
            'fontColor',
            '|',
            'link',
            'bulletedList',
            'numberedList',
            'blockQuote' ],
               
                plugins: [
                    Bold, Essentials, Italic,Underline, Mention, Paragraph, Undo,Link,List,Heading,
                    BlockQuote,Font  
                ],
                initialData: '<p>'+text+'</p>',
            } }
            onChange={ ( event, editor ) => setContent(editor.getData()) }   //eh ckeditor to hi search kita aa onchnge likh k

        />
    );
}

export default Editor;
//eh sara code ckeditor di documentation to hi search krk likhya aa