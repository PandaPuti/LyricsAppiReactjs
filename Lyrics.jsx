import { useActionState } from 'react';
import { searchLyrics } from '../services/api';
import './Lyrics.css';

export function Lyrics() {
  const [state, formAction, isPending] = useActionState(async(prevState, formData) => {
    const response = await searchLyrics(formData.get('artist'), formData.get('song'));
    console.log('useActionState response', response);
    return response;
  });
  return (
    <div className="lyrics-container">
      <h2>Lyrics Search</h2>
      <form action={formAction}>
        <input type="text" name="artist" id="" placeholder="Artist Name" required/>
        <input type="text" name="song" id="" placeholder="Song Name" required/>
        <button type="submit" disabled={isPending}>Search</button>
      </form>
      <hr />
      {state?.error && <div  className='error'><img src="https://cdn.dribbble.com/userupload/20420676/file/original-aac8f7f838812fa53cd92617fad5f892.gif" alt="" />
      <h2>{state?.error}</h2></div>}
      <pre>{state?.lyrics}</pre>
    </div>
  )
}