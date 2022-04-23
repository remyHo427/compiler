import { TOKEN, TOKEN_TYPE } from "./types";

let prg: string;
let skip: boolean;
let toks: TOKEN[] = [];
let char_index: number;
let tok_count = 0;

const scan = (str: string) => {
    prg = str;
    let len = str.length;
    let c: string;
    char_index = 0;

    while (char_index < len) {
        skip = false;
        c = peek();

        switch (c) {
            case '\t':
                next();
                continue;
            case '\n':
                next();
                continue;
            case ' ':
                while (peek_next() == ' ')
                    next();
                next();
                continue;
        }

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
            case ';':
                make_token(TOKEN_TYPE.SEMICOLON);
                next();
                break;
            case '~':
                make_token(TOKEN_TYPE.BITWISE_NOT);
                next();
                break;
            case '?':
                make_token(TOKEN_TYPE.QUESTION);
                next();
                break;
            case ':':
                make_token(TOKEN_TYPE.COLON);
                next();
                break;
            case '.':
                check("...", TOKEN_TYPE.THREE_DOTS);
                make_token(TOKEN_TYPE.DOT);
                next();
                break;
            case '^':
                check("^=", TOKEN_TYPE.BITWISE_XOR_ASSIGN);
                make_token(TOKEN_TYPE.BITWISE_XOR);
                next();
                break;
            case '!':
                check("!=", TOKEN_TYPE.NOT_EQ);
                make_token(TOKEN_TYPE.NOT);
                next();
                break;
            case '&':
                check("&&=", TOKEN_TYPE.AND_ASSIGN);
                check("&&", TOKEN_TYPE.AND);
                check("&=", TOKEN_TYPE.BITWISE_AND_ASSIGN);
                make_token(TOKEN_TYPE.BITWISE_AND);
                next();
                break;
            case '|':
                check("||=", TOKEN_TYPE.OR_ASSIGN);
                check("||", TOKEN_TYPE.OR);
                check("|=", TOKEN_TYPE.BITWISE_OR_ASSIGN);
                make_token(TOKEN_TYPE.BITWISE_OR);
                next();
                break;
            case '=':
                check("=>", TOKEN_TYPE.ARROW);
                check("==", TOKEN_TYPE.EQUAL);
                make_token(TOKEN_TYPE.ASSIGN);
                next();
                break;
            case '+':
                check("++", TOKEN_TYPE.INCREMENT);
                check("+=", TOKEN_TYPE.PLUS_ASSIGN);
                make_token(TOKEN_TYPE.PLUS);
                next();
                break;
            case '-':
                check("--", TOKEN_TYPE.DECREMENT);
                check("-=", TOKEN_TYPE.MINUS_ASSIGN);
                make_token(TOKEN_TYPE.MINUS);
                next();
                break;
            case '*':
                check("*=", TOKEN_TYPE.MULTIPLY_ASSIGN);
                check("**=", TOKEN_TYPE.POWER_ASSIGN);
                check("**", TOKEN_TYPE.POWER);
                make_token(TOKEN_TYPE.MULTIPLY);
                next();
                break;
            case '/':
                check("/=", TOKEN_TYPE.DIVIDE_ASSIGN);
                make_token(TOKEN_TYPE.DIVIDE);
                next();
                break;
            case '%':
                check("%=", TOKEN_TYPE.REMAINDER_ASSIGN);
                make_token(TOKEN_TYPE.REMAINDER);
                next();
                break;
            case '<':
                check("<<=", TOKEN_TYPE.L_SHIFT_ASSIGN);
                check("<<", TOKEN_TYPE.L_SHIFT);
                check("<=", TOKEN_TYPE.LESS_THAN_OR_EQ);
                make_token(TOKEN_TYPE.L_ANGLE);
                next();
                break;
            case '>':
                check(">>>=", TOKEN_TYPE.U_SHIFT_ASSIGN);
                check(">>>", TOKEN_TYPE.U_SHIFT);
                check(">>=", TOKEN_TYPE.R_SHIFT_ASSIGN);
                check(">>", TOKEN_TYPE.R_SHIFT);
                check(">=", TOKEN_TYPE.GREATER_THAN_OR_EQ);
                make_token(TOKEN_TYPE.R_ANGLE);
                next();
                break;
        }

        if (skip) {
            continue;
        }

        switch (c) {
            case 'a':
                check("await", TOKEN_TYPE.AWAIT);
                next();
                break;
            case 'b':
                check("break", TOKEN_TYPE.BREAK);
                next();
                break;
            case 'c':
                check("case", TOKEN_TYPE.CASE);
                check("catch", TOKEN_TYPE.CATCH);
                check("class", TOKEN_TYPE.CLASS);
                check("const", TOKEN_TYPE.CONST);
                check("continue", TOKEN_TYPE.CONTINUE);
                next();
                break;
            case 'd':
                check("do", TOKEN_TYPE.DO);
                check("delete", TOKEN_TYPE.DELETE);
                check("default", TOKEN_TYPE.DEFAULT);
                check("debugger", TOKEN_TYPE.DEBUGGER);
                next();
                break;
        }
        
        next();
    }

    return toks;
}

const make_token = (type: TOKEN_TYPE) => {
    if (!skip) {
        toks[tok_count++] = { type };
        skip = true;
    }
}

const check = (comp_str: string, type: TOKEN_TYPE) => {
    let k = 0;
    let j = char_index;

    while (comp_str[k] == prg[j]) {
        comp_str[k] == prg[j];
        k++;
        j++;
    }

    if (k == comp_str.length) {
        make_token(type);
        advance_by(k);
    }
}

const peek = () => prg[char_index];
const peek_next = () => prg[char_index + 1];
const next = () => char_index++;
const advance_by = (i: number) => char_index += i;

export default scan;