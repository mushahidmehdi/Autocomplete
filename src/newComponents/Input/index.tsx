import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import { addresses } from '../../Zips';
import { useForm } from '../hooks/useForm';
import './index.css';

interface Address {
  code: number;
}

const SearchZip: FC = () => {
  const [selected, setSelected] = useState<{ zip: string; city: string }[]>();
  const [selectedSuggestion, setselectedSuggestion] = useState<string>('');

  const {
    handleSubmit,
    handleChange,
    data: zip,
    errors,
  } = useForm<Address>({
    validations: {
      code: {
        pattern: {
          value: '^[1-9]+[0-9]*$',
          message: 'Only positive numbers are allowed as input field.',
        },
      },
    },
    onSubmit: () => alert('User submitted!'),
  });

  useEffect(() => {
    let matches: any = [];
    if (zip.code) {
      matches = addresses.filter((obj) => {
        const matched = new RegExp(`${zip.code}`);
        return obj.zip.match(matched);
      });
    }
    setSelected(matches);
  }, [zip.code]);
  return (
    <div className='wrapper'>
      <form onSubmit={handleSubmit}>
        <h3>Search for a zip code</h3>
        <div className='inputfield'>
          <input
            placeholder='Search zip code'
            value={selectedSuggestion || zip.code}
            onChange={handleChange('code')}
            required
          />
          <button type='submit' className='submit'>
            Submit
          </button>
        </div>

        <div className='error-wrapper'>
          {errors.code && <p className='error'>{errors.code}</p>}
        </div>
      </form>
      <div className='dropdown-wrapper'>
        {selected &&
          selected?.map((obj, index) => (
            <div
              className='dropdown'
              key={index}
              onClick={() => [setselectedSuggestion(obj.zip), setSelected([])]}
            >
              <p>
                {obj.zip}, {obj.city}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchZip;
