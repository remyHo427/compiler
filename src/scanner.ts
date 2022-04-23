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
            case '\/':
                if (peek_next() == '\/') {
                    advance_by(2);
                    while (peek() != '\n') {
                        next();
                    }
                }
                if (peek_next() == '*') {
                    advance_by(2);
                    while (peek() != '*' || peek_next() != '\/') {
                        next();
                    }
                    advance_by(2);
                }
                break;
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
                check("as", TOKEN_TYPE.AS);
                check("async", TOKEN_TYPE.ASYNC);
                check("await", TOKEN_TYPE.AWAIT);
                identifier();
                break;
            case 'b':
                check("break", TOKEN_TYPE.BREAK);
                identifier();
                break;
            case 'c':
                check("case", TOKEN_TYPE.CASE);
                check("catch", TOKEN_TYPE.CATCH);
                check("class", TOKEN_TYPE.CLASS);
                check("const", TOKEN_TYPE.CONST);
                check("continue", TOKEN_TYPE.CONTINUE);
                identifier();
                break;
            case 'd':
                check("do", TOKEN_TYPE.DO);
                check("delete", TOKEN_TYPE.DELETE);
                check("default", TOKEN_TYPE.DEFAULT);
                check("debugger", TOKEN_TYPE.DEBUGGER);
                identifier();
                break;
            case 'e':
                check("else", TOKEN_TYPE.ELSE);
                check("enum", TOKEN_TYPE.ENUM);
                check("export", TOKEN_TYPE.EXPORT);
                check("extends", TOKEN_TYPE.EXTENDS);
                identifier();
                break;
            case 'f':
                check("for", TOKEN_TYPE.FOR);
                check("from", TOKEN_TYPE.FROM);
                check("finally", TOKEN_TYPE.FINALLY);
                check("function", TOKEN_TYPE.FUNCTION);
                identifier();
                break;
            case 'g':
                check("get", TOKEN_TYPE.GET);
                identifier();
                break;
            case 'i':
                check("if", TOKEN_TYPE.IF);
                check("in", TOKEN_TYPE.IN);
                check("import", TOKEN_TYPE.IMPORT);
                check("instanceof", TOKEN_TYPE.INSTANCEOF);
                identifier();
                break;
            case 'l':
                check("let", TOKEN_TYPE.LET);
                identifier();
                break;
            case 'n':
                check("new", TOKEN_TYPE.NEW);
                check("null", TOKEN_TYPE.NULL);
                identifier();
                break;
            case 'o':
                check("of", TOKEN_TYPE.OF);
                identifier();
                break;
            case 'r':
                check("return", TOKEN_TYPE.RETURN);
                identifier();
                break;
            case 's':
                check("set", TOKEN_TYPE.SET);
                check("super", TOKEN_TYPE.NULL);
                check("switch", TOKEN_TYPE.SWITCH);
                identifier();
                break;
            case 't':
                check("try", TOKEN_TYPE.TRY);
                check("true", TOKEN_TYPE.TRUE);
                check("this", TOKEN_TYPE.THIS);
                check("throw", TOKEN_TYPE.THROW);
                check("target", TOKEN_TYPE.TARGET);
                check("typeof", TOKEN_TYPE.TYPEOF);
                identifier();
                break;
            case 'v':
                check("var", TOKEN_TYPE.VAR);
                check("void", TOKEN_TYPE.VOID);
                identifier();
                break;
            case 'w':
                check("with", TOKEN_TYPE.WITH);
                check("while", TOKEN_TYPE.WHILE);
                identifier();
                break;
            case 'y':
                check("yield", TOKEN_TYPE.YIELD);
                identifier();
                break;
            case '_':
                identifier();
                break;
            case '$':
                identifier();
                break;
            default:
                if (!skip && isalpha(c)) {
                    identifier();
                }
        }

        if (skip) {
            continue;
        }

        next();
    }

    return toks;
}

const make_token = (type: TOKEN_TYPE, id = "") => {
    if (!skip) {
        toks[tok_count++] = { type, id };
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

const identifier = () => {
    let c: string;
    let str = "";
    
    while (1) {
        c = peek();
        if (c == '_' || c == '$' || isnumber(c) || isalpha(c)) {
            str += c;
            next();
        } else {
            break;
        }
    }

    make_token(TOKEN_TYPE.IDENTIFIER, str);
}

const peek = () => prg[char_index];
const peek_next = () => prg[char_index + 1];
const next = () => char_index++;
const advance_by = (i: number) => char_index += i;

// only tested for UTF-8
const isalpha = (c: string) => (c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z');
const isnumber = (c: string) => (c >= '0') && (c <= '9');

export default scan;