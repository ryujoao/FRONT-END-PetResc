import { useState } from "react";
import style from "../style/navbar.module.css";

interface SearchBarProps {
  onSearch: (term: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [term, setTerm] = useState("");
  const [suggestions, setSuggestions] = useState<{ type: "user" | "comunidade", value: string, imagem?: string }[]>([]);

  function normalize(text: string) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTerm(value);
    // Se quiser atualizar sugestões, coloque aqui
  };

  const handleSuggestionClick = (item: { type: "user" | "comunidade", value: string }) => {
    if (item.type === "user") {
      onSearch("@" + item.value);
    } else {
      onSearch(item.value);
    }
    setTerm("");
    setSuggestions([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (term.trim()) {
      onSearch(term.trim());
      setTerm("");
      setSuggestions([]);
    }
  };

  return (
    <div className={style.searchWrapper}>
      <form onSubmit={handleSubmit} className={style.formSearch} autoComplete="off">
        <span className={style.iconSearch}>
          <svg width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.415l-3.85-3.85zm-5.242 1.656a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z" />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Pesquisar"
          value={term}
          onChange={handleChange}
          className={style.inputSearch}
        />
      </form>
      {suggestions.length > 0 && (
        <ul className={style.suggestionsList}>
          {suggestions.map((item) => (
            <li
              key={item.type + item.value}
              className={style.suggestionItem}
              onClick={() => handleSuggestionClick(item)}
            >
              <span className={style.suggestionIcon}>
                {item.type === "user" ? (
                  <svg width="20" height="20" fill="#1b9bee" viewBox="0 0 16 16">
                    <path d="M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0z"/>
                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37c.69-1.19 2.065-2.37 5.468-2.37 3.403 0 4.778 1.18 5.468 2.37A7 7 0 0 0 8 1z"/>
                  </svg>
                ) : (
                  <img
                    src={item.imagem}
                    alt={item.value}
                    style={{ width: 32, height: 32, borderRadius: "12px", objectFit: "cover" }}
                  />
                )}
              </span>
              <span className={style.suggestionText}>
                {item.type === "user" ? `@${item.value}` : item.value}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} // <-- faltava fechar aqui!