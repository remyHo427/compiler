import { TOKEN, TOKEN_TYPE } from "./types";

let prg: string;
let skip: boolean;
let toks: TOKEN[] = [];
let char_index: number;
let tok_count = 0;

const scan = (str: string) => {
    prg = str;
    prg = remove_whitespace(prg);

    let len = prg.length;
    let c: string;
    char_index = 0;

    while (char_index < len) {
        skip = false;
        c = peek();

        switch (c) {
            case '(':
                make_token(TOKEN_TYPE.L_PAREN);
                next();
                break;
            case ')':
                make_token(TOKEN_TYPE.R_PAREN);
                next();
                break;
            case '[':
                make_token(TOKEN_TYPE.L_BRACKET);
                next();
                break;
            case ']':
                make_token(TOKEN_TYPE.R_BRACKET);
                next();
                break;
            case '{':
                make_token(TOKEN_TYPE.L_BRACE);
                next();
                break;
            case '}':
                make_token(TOKEN_TYPE.R_BRACE);
                next();
                break;
            case '.':
                check("...", TOKEN_TYPE.THREE_DOTS);
                make_token(TOKEN_TYPE.DOT);
                next();
                break;
            case ';':
                make_token(TOKEN_TYPE.SEMICOLON);
                next();
                break;
            case '+': 
                check("+=", TOKEN_TYPE.PLUS_ASSIGN);
                make_token(TOKEN_TYPE.PLUS);
                next();
                break;
            case '/':
                make_token(TOKEN_TYPE.DIVIDE);
                next();
                break;
            case '%':
                make_token(TOKEN_TYPE.REMAINDER);
                next();
                break;
        }
        
        if(skip) {
            continue
        }

        next();
    }

    return toks;
}

const remove_whitespace = (str: string) => {
    let len = str.length;
    let new_str = "", c: string;
    char_index = 0;

    while (char_index < len) {
        c = peek();
        switch (c) {
            case '\t':
                next()
                continue;
            case '\n':
                next()
                continue;
            case ' ':
                while (peek_next() == ' ') {
                    next()
                }
                new_str += c;
                char_index++
                break;
            default:
                new_str += c;
                next()
                break;
        }
    }

    return new_str;
}

const make_token = (type: TOKEN_TYPE) => {
    if(!skip) {
        toks[tok_count++] = { type };
        skip = true;
    }
}

const check = (comp_str: string, type: TOKEN_TYPE) => {
    // doesn't work here, ... throws into infinite loop
    let k = 0;
    for (let j = char_index; j < 10 && comp_str[k] == prg[j]; j++, k++)
        ;
    if (k == comp_str.length) {
        make_token(type);
    }
}

const peek = () => prg[char_index];
const peek_next = () => prg[char_index + 1];
const next = () => char_index++;

export default scan;