import { useEffect, useState } from "react";
import axios from "axios";

export default function GetPosts() {
    const [postList, setPostList] = useState([]); // 원본 포스트 리스트
    const [result, setResult] = useState([]); // 검색 결과를 담을 배열
    const [keyword, setKeyword] = useState('');
    const [category, setCategory] = useState('title');

    const options = [
        {
            key: 'option1',
            value: 'title',
            name: '제목',
        },
        {
            key: 'option2',
            value: 'body',
            name: '내용',
        }
    ];

    useEffect(() => {
        async function getPosts() {
            try {
                const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
                setPostList(res.data);
                setResult(res.data);
            } catch(error) {
                console.log(error);
            }
        }

        setTimeout(() => {
            getPosts();
        }, 2000);
    }, []);

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    }

    const handleKeywordChange = (e) => {
        setKeyword(e.target.value);
    }

    const handleSearch = () => {
        if (keyword.trim() === '') {
            setResult(postList);
        } else {
            const newPosts = postList.filter((post) => {
                if (category === 'title') {
                    return post.title.includes(keyword);
                } else if (category === 'body') {
                    return post.body.includes(keyword);
                }
                return false;
            });
            setResult(newPosts);
        }
    }

    return (
        <div className="GetPosts">
            <select onChange={handleCategoryChange}>
                {options.map((option) => (
                    <option key={option.key} value={option.value}>{option.name}</option>
                ))}
            </select>
            <input type="text" onChange={handleKeywordChange}/>
            <button type='button' onClick={handleSearch}>검색</button>
            {postList.length === 0 ? (
                <h1>Loading</h1>
            ) : (
                result.map((list) => (
                    <ul key={list.id}>
                        <span>제목</span><li>{list.title}</li>
                        <span>본문</span><li>{list.body}</li>
                    </ul>
                ))
            )}
        </div>
    );
}