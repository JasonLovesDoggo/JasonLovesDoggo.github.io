
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    const identity = x => x;
    function assign$1(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function is_promise(value) {
        return value && typeof value === 'object' && typeof value.then === 'function';
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign$1($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function once(fn) {
        let ran = false;
        return function (...args) {
            if (ran)
                return;
            ran = true;
            fn.call(this, ...args);
        };
    }
    function null_to_empty(value) {
        return value == null ? '' : value;
    }
    function set_store_value(store, ret, value) {
        store.set(value);
        return ret;
    }

    const is_client = typeof window !== 'undefined';
    let now = is_client
        ? () => window.performance.now()
        : () => Date.now();
    let raf = is_client ? cb => requestAnimationFrame(cb) : noop;

    const tasks = new Set();
    function run_tasks(now) {
        tasks.forEach(task => {
            if (!task.c(now)) {
                tasks.delete(task);
                task.f();
            }
        });
        if (tasks.size !== 0)
            raf(run_tasks);
    }
    /**
     * Creates a new task that runs on each raf frame
     * until it returns a falsy value or is aborted
     */
    function loop(callback) {
        let task;
        if (tasks.size === 0)
            raf(run_tasks);
        return {
            promise: new Promise(fulfill => {
                tasks.add(task = { c: callback, f: fulfill });
            }),
            abort() {
                tasks.delete(task);
            }
        };
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function get_root_for_style(node) {
        if (!node)
            return document;
        const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
        if (root && root.host) {
            return root;
        }
        return node.ownerDocument;
    }
    function append_empty_stylesheet(node) {
        const style_element = element('style');
        append_stylesheet(get_root_for_style(node), style_element);
        return style_element.sheet;
    }
    function append_stylesheet(node, style) {
        append(node.head || node, style);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function prevent_default(fn) {
        return function (event) {
            event.preventDefault();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function self$1(fn) {
        return function (event) {
            // @ts-ignore
            if (event.target === this)
                fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        if (value === null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function select_option(select, value) {
        for (let i = 0; i < select.options.length; i += 1) {
            const option = select.options[i];
            if (option.__value === value) {
                option.selected = true;
                return;
            }
        }
        select.selectedIndex = -1; // no option should be selected
    }
    function select_value(select) {
        const selected_option = select.querySelector(':checked') || select.options[0];
        return selected_option && selected_option.__value;
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    // we need to store the information for multiple documents because a Svelte application could also contain iframes
    // https://github.com/sveltejs/svelte/issues/3624
    const managed_styles = new Map();
    let active = 0;
    // https://github.com/darkskyapp/string-hash/blob/master/index.js
    function hash(str) {
        let hash = 5381;
        let i = str.length;
        while (i--)
            hash = ((hash << 5) - hash) ^ str.charCodeAt(i);
        return hash >>> 0;
    }
    function create_style_information(doc, node) {
        const info = { stylesheet: append_empty_stylesheet(node), rules: {} };
        managed_styles.set(doc, info);
        return info;
    }
    function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
        const step = 16.666 / duration;
        let keyframes = '{\n';
        for (let p = 0; p <= 1; p += step) {
            const t = a + (b - a) * ease(p);
            keyframes += p * 100 + `%{${fn(t, 1 - t)}}\n`;
        }
        const rule = keyframes + `100% {${fn(b, 1 - b)}}\n}`;
        const name = `__svelte_${hash(rule)}_${uid}`;
        const doc = get_root_for_style(node);
        const { stylesheet, rules } = managed_styles.get(doc) || create_style_information(doc, node);
        if (!rules[name]) {
            rules[name] = true;
            stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
        }
        const animation = node.style.animation || '';
        node.style.animation = `${animation ? `${animation}, ` : ''}${name} ${duration}ms linear ${delay}ms 1 both`;
        active += 1;
        return name;
    }
    function delete_rule(node, name) {
        const previous = (node.style.animation || '').split(', ');
        const next = previous.filter(name
            ? anim => anim.indexOf(name) < 0 // remove specific animation
            : anim => anim.indexOf('__svelte') === -1 // remove all Svelte animations
        );
        const deleted = previous.length - next.length;
        if (deleted) {
            node.style.animation = next.join(', ');
            active -= deleted;
            if (!active)
                clear_rules();
        }
    }
    function clear_rules() {
        raf(() => {
            if (active)
                return;
            managed_styles.forEach(info => {
                const { stylesheet } = info;
                let i = stylesheet.cssRules.length;
                while (i--)
                    stylesheet.deleteRule(i);
                info.rules = {};
            });
            managed_styles.clear();
        });
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail);
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
            }
        };
    }
    function setContext(key, context) {
        get_current_component().$$.context.set(key, context);
    }
    function getContext(key) {
        return get_current_component().$$.context.get(key);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function add_flush_callback(fn) {
        flush_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }

    let promise;
    function wait() {
        if (!promise) {
            promise = Promise.resolve();
            promise.then(() => {
                promise = null;
            });
        }
        return promise;
    }
    function dispatch(node, direction, kind) {
        node.dispatchEvent(custom_event(`${direction ? 'intro' : 'outro'}${kind}`));
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }
    const null_transition = { duration: 0 };
    function create_in_transition(node, fn, params) {
        let config = fn(node, params);
        let running = false;
        let animation_name;
        let task;
        let uid = 0;
        function cleanup() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function go() {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            if (css)
                animation_name = create_rule(node, 0, 1, duration, delay, easing, css, uid++);
            tick(0, 1);
            const start_time = now() + delay;
            const end_time = start_time + duration;
            if (task)
                task.abort();
            running = true;
            add_render_callback(() => dispatch(node, true, 'start'));
            task = loop(now => {
                if (running) {
                    if (now >= end_time) {
                        tick(1, 0);
                        dispatch(node, true, 'end');
                        cleanup();
                        return running = false;
                    }
                    if (now >= start_time) {
                        const t = easing((now - start_time) / duration);
                        tick(t, 1 - t);
                    }
                }
                return running;
            });
        }
        let started = false;
        return {
            start() {
                if (started)
                    return;
                started = true;
                delete_rule(node);
                if (is_function(config)) {
                    config = config();
                    wait().then(go);
                }
                else {
                    go();
                }
            },
            invalidate() {
                started = false;
            },
            end() {
                if (running) {
                    cleanup();
                    running = false;
                }
            }
        };
    }
    function create_out_transition(node, fn, params) {
        let config = fn(node, params);
        let running = true;
        let animation_name;
        const group = outros;
        group.r += 1;
        function go() {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            if (css)
                animation_name = create_rule(node, 1, 0, duration, delay, easing, css);
            const start_time = now() + delay;
            const end_time = start_time + duration;
            add_render_callback(() => dispatch(node, false, 'start'));
            loop(now => {
                if (running) {
                    if (now >= end_time) {
                        tick(0, 1);
                        dispatch(node, false, 'end');
                        if (!--group.r) {
                            // this will result in `end()` being called,
                            // so we don't need to clean up here
                            run_all(group.c);
                        }
                        return false;
                    }
                    if (now >= start_time) {
                        const t = easing((now - start_time) / duration);
                        tick(1 - t, t);
                    }
                }
                return running;
            });
        }
        if (is_function(config)) {
            wait().then(() => {
                // @ts-ignore
                config = config();
                go();
            });
        }
        else {
            go();
        }
        return {
            end(reset) {
                if (reset && config.tick) {
                    config.tick(1, 0);
                }
                if (running) {
                    if (animation_name)
                        delete_rule(node, animation_name);
                    running = false;
                }
            }
        };
    }
    function create_bidirectional_transition(node, fn, params, intro) {
        let config = fn(node, params);
        let t = intro ? 0 : 1;
        let running_program = null;
        let pending_program = null;
        let animation_name = null;
        function clear_animation() {
            if (animation_name)
                delete_rule(node, animation_name);
        }
        function init(program, duration) {
            const d = (program.b - t);
            duration *= Math.abs(d);
            return {
                a: t,
                b: program.b,
                d,
                duration,
                start: program.start,
                end: program.start + duration,
                group: program.group
            };
        }
        function go(b) {
            const { delay = 0, duration = 300, easing = identity, tick = noop, css } = config || null_transition;
            const program = {
                start: now() + delay,
                b
            };
            if (!b) {
                // @ts-ignore todo: improve typings
                program.group = outros;
                outros.r += 1;
            }
            if (running_program || pending_program) {
                pending_program = program;
            }
            else {
                // if this is an intro, and there's a delay, we need to do
                // an initial tick and/or apply CSS animation immediately
                if (css) {
                    clear_animation();
                    animation_name = create_rule(node, t, b, duration, delay, easing, css);
                }
                if (b)
                    tick(0, 1);
                running_program = init(program, duration);
                add_render_callback(() => dispatch(node, b, 'start'));
                loop(now => {
                    if (pending_program && now > pending_program.start) {
                        running_program = init(pending_program, duration);
                        pending_program = null;
                        dispatch(node, running_program.b, 'start');
                        if (css) {
                            clear_animation();
                            animation_name = create_rule(node, t, running_program.b, running_program.duration, 0, easing, config.css);
                        }
                    }
                    if (running_program) {
                        if (now >= running_program.end) {
                            tick(t = running_program.b, 1 - t);
                            dispatch(node, running_program.b, 'end');
                            if (!pending_program) {
                                // we're done
                                if (running_program.b) {
                                    // intro — we can tidy up immediately
                                    clear_animation();
                                }
                                else {
                                    // outro — needs to be coordinated
                                    if (!--running_program.group.r)
                                        run_all(running_program.group.c);
                                }
                            }
                            running_program = null;
                        }
                        else if (now >= running_program.start) {
                            const p = now - running_program.start;
                            t = running_program.a + running_program.d * easing(p / running_program.duration);
                            tick(t, 1 - t);
                        }
                    }
                    return !!(running_program || pending_program);
                });
            }
        }
        return {
            run(b) {
                if (is_function(config)) {
                    wait().then(() => {
                        // @ts-ignore
                        config = config();
                        go(b);
                    });
                }
                else {
                    go(b);
                }
            },
            end() {
                clear_animation();
                running_program = pending_program = null;
            }
        };
    }

    function handle_promise(promise, info) {
        const token = info.token = {};
        function update(type, index, key, value) {
            if (info.token !== token)
                return;
            info.resolved = value;
            let child_ctx = info.ctx;
            if (key !== undefined) {
                child_ctx = child_ctx.slice();
                child_ctx[key] = value;
            }
            const block = type && (info.current = type)(child_ctx);
            let needs_flush = false;
            if (info.block) {
                if (info.blocks) {
                    info.blocks.forEach((block, i) => {
                        if (i !== index && block) {
                            group_outros();
                            transition_out(block, 1, 1, () => {
                                if (info.blocks[i] === block) {
                                    info.blocks[i] = null;
                                }
                            });
                            check_outros();
                        }
                    });
                }
                else {
                    info.block.d(1);
                }
                block.c();
                transition_in(block, 1);
                block.m(info.mount(), info.anchor);
                needs_flush = true;
            }
            info.block = block;
            if (info.blocks)
                info.blocks[index] = block;
            if (needs_flush) {
                flush();
            }
        }
        if (is_promise(promise)) {
            const current_component = get_current_component();
            promise.then(value => {
                set_current_component(current_component);
                update(info.then, 1, info.value, value);
                set_current_component(null);
            }, error => {
                set_current_component(current_component);
                update(info.catch, 2, info.error, error);
                set_current_component(null);
                if (!info.hasCatch) {
                    throw error;
                }
            });
            // if we previously had a then/catch block, destroy it
            if (info.current !== info.pending) {
                update(info.pending, 0);
                return true;
            }
        }
        else {
            if (info.current !== info.then) {
                update(info.then, 1, info.value, promise);
                return true;
            }
            info.resolved = promise;
        }
    }
    function update_await_block_branch(info, ctx, dirty) {
        const child_ctx = ctx.slice();
        const { resolved } = info;
        if (info.current === info.then) {
            child_ctx[info.value] = resolved;
        }
        if (info.current === info.catch) {
            child_ctx[info.error] = resolved;
        }
        info.block.p(child_ctx, dirty);
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);

    function destroy_block(block, lookup) {
        block.d(1);
        lookup.delete(block.key);
    }
    function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
        let o = old_blocks.length;
        let n = list.length;
        let i = o;
        const old_indexes = {};
        while (i--)
            old_indexes[old_blocks[i].key] = i;
        const new_blocks = [];
        const new_lookup = new Map();
        const deltas = new Map();
        i = n;
        while (i--) {
            const child_ctx = get_context(ctx, list, i);
            const key = get_key(child_ctx);
            let block = lookup.get(key);
            if (!block) {
                block = create_each_block(key, child_ctx);
                block.c();
            }
            else if (dynamic) {
                block.p(child_ctx, dirty);
            }
            new_lookup.set(key, new_blocks[i] = block);
            if (key in old_indexes)
                deltas.set(key, Math.abs(i - old_indexes[key]));
        }
        const will_move = new Set();
        const did_move = new Set();
        function insert(block) {
            transition_in(block, 1);
            block.m(node, next);
            lookup.set(block.key, block);
            next = block.first;
            n--;
        }
        while (o && n) {
            const new_block = new_blocks[n - 1];
            const old_block = old_blocks[o - 1];
            const new_key = new_block.key;
            const old_key = old_block.key;
            if (new_block === old_block) {
                // do nothing
                next = new_block.first;
                o--;
                n--;
            }
            else if (!new_lookup.has(old_key)) {
                // remove old block
                destroy(old_block, lookup);
                o--;
            }
            else if (!lookup.has(new_key) || will_move.has(new_key)) {
                insert(new_block);
            }
            else if (did_move.has(old_key)) {
                o--;
            }
            else if (deltas.get(new_key) > deltas.get(old_key)) {
                did_move.add(new_key);
                insert(new_block);
            }
            else {
                will_move.add(old_key);
                o--;
            }
        }
        while (o--) {
            const old_block = old_blocks[o];
            if (!new_lookup.has(old_block.key))
                destroy(old_block, lookup);
        }
        while (n)
            insert(new_blocks[n - 1]);
        return new_blocks;
    }
    function validate_each_keys(ctx, list, get_context, get_key) {
        const keys = new Set();
        for (let i = 0; i < list.length; i++) {
            const key = get_key(get_context(ctx, list, i));
            if (keys.has(key)) {
                throw new Error('Cannot have duplicate keys in a keyed each');
            }
            keys.add(key);
        }
    }

    function bind(component, name, callback) {
        const index = component.$$.props[name];
        if (index !== undefined) {
            component.$$.bound[index] = callback;
            callback(component.$$.ctx[index]);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init$1(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.46.4' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev('SvelteDOMSetProperty', { node, property, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    var alea$1 = {exports: {}};

    (function (module) {
    // A port of an algorithm by Johannes Baagøe <baagoe@baagoe.com>, 2010
    // http://baagoe.com/en/RandomMusings/javascript/
    // https://github.com/nquinlan/better-random-numbers-for-javascript-mirror
    // Original work is under MIT license -

    // Copyright (C) 2010 by Johannes Baagøe <baagoe@baagoe.org>
    //
    // Permission is hereby granted, free of charge, to any person obtaining a copy
    // of this software and associated documentation files (the "Software"), to deal
    // in the Software without restriction, including without limitation the rights
    // to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    // copies of the Software, and to permit persons to whom the Software is
    // furnished to do so, subject to the following conditions:
    //
    // The above copyright notice and this permission notice shall be included in
    // all copies or substantial portions of the Software.
    //
    // THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    // IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    // FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    // AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    // LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    // OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    // THE SOFTWARE.



    (function(global, module, define) {

    function Alea(seed) {
      var me = this, mash = Mash();

      me.next = function() {
        var t = 2091639 * me.s0 + me.c * 2.3283064365386963e-10; // 2^-32
        me.s0 = me.s1;
        me.s1 = me.s2;
        return me.s2 = t - (me.c = t | 0);
      };

      // Apply the seeding algorithm from Baagoe.
      me.c = 1;
      me.s0 = mash(' ');
      me.s1 = mash(' ');
      me.s2 = mash(' ');
      me.s0 -= mash(seed);
      if (me.s0 < 0) { me.s0 += 1; }
      me.s1 -= mash(seed);
      if (me.s1 < 0) { me.s1 += 1; }
      me.s2 -= mash(seed);
      if (me.s2 < 0) { me.s2 += 1; }
      mash = null;
    }

    function copy(f, t) {
      t.c = f.c;
      t.s0 = f.s0;
      t.s1 = f.s1;
      t.s2 = f.s2;
      return t;
    }

    function impl(seed, opts) {
      var xg = new Alea(seed),
          state = opts && opts.state,
          prng = xg.next;
      prng.int32 = function() { return (xg.next() * 0x100000000) | 0; };
      prng.double = function() {
        return prng() + (prng() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53
      };
      prng.quick = prng;
      if (state) {
        if (typeof(state) == 'object') copy(state, xg);
        prng.state = function() { return copy(xg, {}); };
      }
      return prng;
    }

    function Mash() {
      var n = 0xefc8249d;

      var mash = function(data) {
        data = String(data);
        for (var i = 0; i < data.length; i++) {
          n += data.charCodeAt(i);
          var h = 0.02519603282416938 * n;
          n = h >>> 0;
          h -= n;
          h *= n;
          n = h >>> 0;
          h -= n;
          n += h * 0x100000000; // 2^32
        }
        return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
      };

      return mash;
    }


    if (module && module.exports) {
      module.exports = impl;
    } else if (define && define.amd) {
      define(function() { return impl; });
    } else {
      this.alea = impl;
    }

    })(
      commonjsGlobal,
      module,    // present in node.js
      (typeof undefined) == 'function'    // present with an AMD loader
    );
    }(alea$1));

    var xor128$1 = {exports: {}};

    (function (module) {
    // A Javascript implementaion of the "xor128" prng algorithm by
    // George Marsaglia.  See http://www.jstatsoft.org/v08/i14/paper

    (function(global, module, define) {

    function XorGen(seed) {
      var me = this, strseed = '';

      me.x = 0;
      me.y = 0;
      me.z = 0;
      me.w = 0;

      // Set up generator function.
      me.next = function() {
        var t = me.x ^ (me.x << 11);
        me.x = me.y;
        me.y = me.z;
        me.z = me.w;
        return me.w ^= (me.w >>> 19) ^ t ^ (t >>> 8);
      };

      if (seed === (seed | 0)) {
        // Integer seed.
        me.x = seed;
      } else {
        // String seed.
        strseed += seed;
      }

      // Mix in string seed, then discard an initial batch of 64 values.
      for (var k = 0; k < strseed.length + 64; k++) {
        me.x ^= strseed.charCodeAt(k) | 0;
        me.next();
      }
    }

    function copy(f, t) {
      t.x = f.x;
      t.y = f.y;
      t.z = f.z;
      t.w = f.w;
      return t;
    }

    function impl(seed, opts) {
      var xg = new XorGen(seed),
          state = opts && opts.state,
          prng = function() { return (xg.next() >>> 0) / 0x100000000; };
      prng.double = function() {
        do {
          var top = xg.next() >>> 11,
              bot = (xg.next() >>> 0) / 0x100000000,
              result = (top + bot) / (1 << 21);
        } while (result === 0);
        return result;
      };
      prng.int32 = xg.next;
      prng.quick = prng;
      if (state) {
        if (typeof(state) == 'object') copy(state, xg);
        prng.state = function() { return copy(xg, {}); };
      }
      return prng;
    }

    if (module && module.exports) {
      module.exports = impl;
    } else if (define && define.amd) {
      define(function() { return impl; });
    } else {
      this.xor128 = impl;
    }

    })(
      commonjsGlobal,
      module,    // present in node.js
      (typeof undefined) == 'function'    // present with an AMD loader
    );
    }(xor128$1));

    var xorwow$1 = {exports: {}};

    (function (module) {
    // A Javascript implementaion of the "xorwow" prng algorithm by
    // George Marsaglia.  See http://www.jstatsoft.org/v08/i14/paper

    (function(global, module, define) {

    function XorGen(seed) {
      var me = this, strseed = '';

      // Set up generator function.
      me.next = function() {
        var t = (me.x ^ (me.x >>> 2));
        me.x = me.y; me.y = me.z; me.z = me.w; me.w = me.v;
        return (me.d = (me.d + 362437 | 0)) +
           (me.v = (me.v ^ (me.v << 4)) ^ (t ^ (t << 1))) | 0;
      };

      me.x = 0;
      me.y = 0;
      me.z = 0;
      me.w = 0;
      me.v = 0;

      if (seed === (seed | 0)) {
        // Integer seed.
        me.x = seed;
      } else {
        // String seed.
        strseed += seed;
      }

      // Mix in string seed, then discard an initial batch of 64 values.
      for (var k = 0; k < strseed.length + 64; k++) {
        me.x ^= strseed.charCodeAt(k) | 0;
        if (k == strseed.length) {
          me.d = me.x << 10 ^ me.x >>> 4;
        }
        me.next();
      }
    }

    function copy(f, t) {
      t.x = f.x;
      t.y = f.y;
      t.z = f.z;
      t.w = f.w;
      t.v = f.v;
      t.d = f.d;
      return t;
    }

    function impl(seed, opts) {
      var xg = new XorGen(seed),
          state = opts && opts.state,
          prng = function() { return (xg.next() >>> 0) / 0x100000000; };
      prng.double = function() {
        do {
          var top = xg.next() >>> 11,
              bot = (xg.next() >>> 0) / 0x100000000,
              result = (top + bot) / (1 << 21);
        } while (result === 0);
        return result;
      };
      prng.int32 = xg.next;
      prng.quick = prng;
      if (state) {
        if (typeof(state) == 'object') copy(state, xg);
        prng.state = function() { return copy(xg, {}); };
      }
      return prng;
    }

    if (module && module.exports) {
      module.exports = impl;
    } else if (define && define.amd) {
      define(function() { return impl; });
    } else {
      this.xorwow = impl;
    }

    })(
      commonjsGlobal,
      module,    // present in node.js
      (typeof undefined) == 'function'    // present with an AMD loader
    );
    }(xorwow$1));

    var xorshift7$1 = {exports: {}};

    (function (module) {
    // A Javascript implementaion of the "xorshift7" algorithm by
    // François Panneton and Pierre L'ecuyer:
    // "On the Xorgshift Random Number Generators"
    // http://saluc.engr.uconn.edu/refs/crypto/rng/panneton05onthexorshift.pdf

    (function(global, module, define) {

    function XorGen(seed) {
      var me = this;

      // Set up generator function.
      me.next = function() {
        // Update xor generator.
        var X = me.x, i = me.i, t, v;
        t = X[i]; t ^= (t >>> 7); v = t ^ (t << 24);
        t = X[(i + 1) & 7]; v ^= t ^ (t >>> 10);
        t = X[(i + 3) & 7]; v ^= t ^ (t >>> 3);
        t = X[(i + 4) & 7]; v ^= t ^ (t << 7);
        t = X[(i + 7) & 7]; t = t ^ (t << 13); v ^= t ^ (t << 9);
        X[i] = v;
        me.i = (i + 1) & 7;
        return v;
      };

      function init(me, seed) {
        var j, X = [];

        if (seed === (seed | 0)) {
          // Seed state array using a 32-bit integer.
          X[0] = seed;
        } else {
          // Seed state using a string.
          seed = '' + seed;
          for (j = 0; j < seed.length; ++j) {
            X[j & 7] = (X[j & 7] << 15) ^
                (seed.charCodeAt(j) + X[(j + 1) & 7] << 13);
          }
        }
        // Enforce an array length of 8, not all zeroes.
        while (X.length < 8) X.push(0);
        for (j = 0; j < 8 && X[j] === 0; ++j);
        if (j == 8) X[7] = -1;

        me.x = X;
        me.i = 0;

        // Discard an initial 256 values.
        for (j = 256; j > 0; --j) {
          me.next();
        }
      }

      init(me, seed);
    }

    function copy(f, t) {
      t.x = f.x.slice();
      t.i = f.i;
      return t;
    }

    function impl(seed, opts) {
      if (seed == null) seed = +(new Date);
      var xg = new XorGen(seed),
          state = opts && opts.state,
          prng = function() { return (xg.next() >>> 0) / 0x100000000; };
      prng.double = function() {
        do {
          var top = xg.next() >>> 11,
              bot = (xg.next() >>> 0) / 0x100000000,
              result = (top + bot) / (1 << 21);
        } while (result === 0);
        return result;
      };
      prng.int32 = xg.next;
      prng.quick = prng;
      if (state) {
        if (state.x) copy(state, xg);
        prng.state = function() { return copy(xg, {}); };
      }
      return prng;
    }

    if (module && module.exports) {
      module.exports = impl;
    } else if (define && define.amd) {
      define(function() { return impl; });
    } else {
      this.xorshift7 = impl;
    }

    })(
      commonjsGlobal,
      module,    // present in node.js
      (typeof undefined) == 'function'    // present with an AMD loader
    );
    }(xorshift7$1));

    var xor4096$1 = {exports: {}};

    (function (module) {
    // A Javascript implementaion of Richard Brent's Xorgens xor4096 algorithm.
    //
    // This fast non-cryptographic random number generator is designed for
    // use in Monte-Carlo algorithms. It combines a long-period xorshift
    // generator with a Weyl generator, and it passes all common batteries
    // of stasticial tests for randomness while consuming only a few nanoseconds
    // for each prng generated.  For background on the generator, see Brent's
    // paper: "Some long-period random number generators using shifts and xors."
    // http://arxiv.org/pdf/1004.3115v1.pdf
    //
    // Usage:
    //
    // var xor4096 = require('xor4096');
    // random = xor4096(1);                        // Seed with int32 or string.
    // assert.equal(random(), 0.1520436450538547); // (0, 1) range, 53 bits.
    // assert.equal(random.int32(), 1806534897);   // signed int32, 32 bits.
    //
    // For nonzero numeric keys, this impelementation provides a sequence
    // identical to that by Brent's xorgens 3 implementaion in C.  This
    // implementation also provides for initalizing the generator with
    // string seeds, or for saving and restoring the state of the generator.
    //
    // On Chrome, this prng benchmarks about 2.1 times slower than
    // Javascript's built-in Math.random().

    (function(global, module, define) {

    function XorGen(seed) {
      var me = this;

      // Set up generator function.
      me.next = function() {
        var w = me.w,
            X = me.X, i = me.i, t, v;
        // Update Weyl generator.
        me.w = w = (w + 0x61c88647) | 0;
        // Update xor generator.
        v = X[(i + 34) & 127];
        t = X[i = ((i + 1) & 127)];
        v ^= v << 13;
        t ^= t << 17;
        v ^= v >>> 15;
        t ^= t >>> 12;
        // Update Xor generator array state.
        v = X[i] = v ^ t;
        me.i = i;
        // Result is the combination.
        return (v + (w ^ (w >>> 16))) | 0;
      };

      function init(me, seed) {
        var t, v, i, j, w, X = [], limit = 128;
        if (seed === (seed | 0)) {
          // Numeric seeds initialize v, which is used to generates X.
          v = seed;
          seed = null;
        } else {
          // String seeds are mixed into v and X one character at a time.
          seed = seed + '\0';
          v = 0;
          limit = Math.max(limit, seed.length);
        }
        // Initialize circular array and weyl value.
        for (i = 0, j = -32; j < limit; ++j) {
          // Put the unicode characters into the array, and shuffle them.
          if (seed) v ^= seed.charCodeAt((j + 32) % seed.length);
          // After 32 shuffles, take v as the starting w value.
          if (j === 0) w = v;
          v ^= v << 10;
          v ^= v >>> 15;
          v ^= v << 4;
          v ^= v >>> 13;
          if (j >= 0) {
            w = (w + 0x61c88647) | 0;     // Weyl.
            t = (X[j & 127] ^= (v + w));  // Combine xor and weyl to init array.
            i = (0 == t) ? i + 1 : 0;     // Count zeroes.
          }
        }
        // We have detected all zeroes; make the key nonzero.
        if (i >= 128) {
          X[(seed && seed.length || 0) & 127] = -1;
        }
        // Run the generator 512 times to further mix the state before using it.
        // Factoring this as a function slows the main generator, so it is just
        // unrolled here.  The weyl generator is not advanced while warming up.
        i = 127;
        for (j = 4 * 128; j > 0; --j) {
          v = X[(i + 34) & 127];
          t = X[i = ((i + 1) & 127)];
          v ^= v << 13;
          t ^= t << 17;
          v ^= v >>> 15;
          t ^= t >>> 12;
          X[i] = v ^ t;
        }
        // Storing state as object members is faster than using closure variables.
        me.w = w;
        me.X = X;
        me.i = i;
      }

      init(me, seed);
    }

    function copy(f, t) {
      t.i = f.i;
      t.w = f.w;
      t.X = f.X.slice();
      return t;
    }
    function impl(seed, opts) {
      if (seed == null) seed = +(new Date);
      var xg = new XorGen(seed),
          state = opts && opts.state,
          prng = function() { return (xg.next() >>> 0) / 0x100000000; };
      prng.double = function() {
        do {
          var top = xg.next() >>> 11,
              bot = (xg.next() >>> 0) / 0x100000000,
              result = (top + bot) / (1 << 21);
        } while (result === 0);
        return result;
      };
      prng.int32 = xg.next;
      prng.quick = prng;
      if (state) {
        if (state.X) copy(state, xg);
        prng.state = function() { return copy(xg, {}); };
      }
      return prng;
    }

    if (module && module.exports) {
      module.exports = impl;
    } else if (define && define.amd) {
      define(function() { return impl; });
    } else {
      this.xor4096 = impl;
    }

    })(
      commonjsGlobal,                                     // window object or global
      module,    // present in node.js
      (typeof undefined) == 'function'    // present with an AMD loader
    );
    }(xor4096$1));

    var tychei$1 = {exports: {}};

    (function (module) {
    // A Javascript implementaion of the "Tyche-i" prng algorithm by
    // Samuel Neves and Filipe Araujo.
    // See https://eden.dei.uc.pt/~sneves/pubs/2011-snfa2.pdf

    (function(global, module, define) {

    function XorGen(seed) {
      var me = this, strseed = '';

      // Set up generator function.
      me.next = function() {
        var b = me.b, c = me.c, d = me.d, a = me.a;
        b = (b << 25) ^ (b >>> 7) ^ c;
        c = (c - d) | 0;
        d = (d << 24) ^ (d >>> 8) ^ a;
        a = (a - b) | 0;
        me.b = b = (b << 20) ^ (b >>> 12) ^ c;
        me.c = c = (c - d) | 0;
        me.d = (d << 16) ^ (c >>> 16) ^ a;
        return me.a = (a - b) | 0;
      };

      /* The following is non-inverted tyche, which has better internal
       * bit diffusion, but which is about 25% slower than tyche-i in JS.
      me.next = function() {
        var a = me.a, b = me.b, c = me.c, d = me.d;
        a = (me.a + me.b | 0) >>> 0;
        d = me.d ^ a; d = d << 16 ^ d >>> 16;
        c = me.c + d | 0;
        b = me.b ^ c; b = b << 12 ^ d >>> 20;
        me.a = a = a + b | 0;
        d = d ^ a; me.d = d = d << 8 ^ d >>> 24;
        me.c = c = c + d | 0;
        b = b ^ c;
        return me.b = (b << 7 ^ b >>> 25);
      }
      */

      me.a = 0;
      me.b = 0;
      me.c = 2654435769 | 0;
      me.d = 1367130551;

      if (seed === Math.floor(seed)) {
        // Integer seed.
        me.a = (seed / 0x100000000) | 0;
        me.b = seed | 0;
      } else {
        // String seed.
        strseed += seed;
      }

      // Mix in string seed, then discard an initial batch of 64 values.
      for (var k = 0; k < strseed.length + 20; k++) {
        me.b ^= strseed.charCodeAt(k) | 0;
        me.next();
      }
    }

    function copy(f, t) {
      t.a = f.a;
      t.b = f.b;
      t.c = f.c;
      t.d = f.d;
      return t;
    }
    function impl(seed, opts) {
      var xg = new XorGen(seed),
          state = opts && opts.state,
          prng = function() { return (xg.next() >>> 0) / 0x100000000; };
      prng.double = function() {
        do {
          var top = xg.next() >>> 11,
              bot = (xg.next() >>> 0) / 0x100000000,
              result = (top + bot) / (1 << 21);
        } while (result === 0);
        return result;
      };
      prng.int32 = xg.next;
      prng.quick = prng;
      if (state) {
        if (typeof(state) == 'object') copy(state, xg);
        prng.state = function() { return copy(xg, {}); };
      }
      return prng;
    }

    if (module && module.exports) {
      module.exports = impl;
    } else if (define && define.amd) {
      define(function() { return impl; });
    } else {
      this.tychei = impl;
    }

    })(
      commonjsGlobal,
      module,    // present in node.js
      (typeof undefined) == 'function'    // present with an AMD loader
    );
    }(tychei$1));

    var seedrandom$1 = {exports: {}};

    /*
    Copyright 2019 David Bau.

    Permission is hereby granted, free of charge, to any person obtaining
    a copy of this software and associated documentation files (the
    "Software"), to deal in the Software without restriction, including
    without limitation the rights to use, copy, modify, merge, publish,
    distribute, sublicense, and/or sell copies of the Software, and to
    permit persons to whom the Software is furnished to do so, subject to
    the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
    IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
    CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
    TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
    SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

    */

    (function (module) {
    (function (global, pool, math) {
    //
    // The following constants are related to IEEE 754 limits.
    //

    var width = 256,        // each RC4 output is 0 <= x < 256
        chunks = 6,         // at least six RC4 outputs for each double
        digits = 52,        // there are 52 significant digits in a double
        rngname = 'random', // rngname: name for Math.random and Math.seedrandom
        startdenom = math.pow(width, chunks),
        significance = math.pow(2, digits),
        overflow = significance * 2,
        mask = width - 1,
        nodecrypto;         // node.js crypto module, initialized at the bottom.

    //
    // seedrandom()
    // This is the seedrandom function described above.
    //
    function seedrandom(seed, options, callback) {
      var key = [];
      options = (options == true) ? { entropy: true } : (options || {});

      // Flatten the seed string or build one from local entropy if needed.
      var shortseed = mixkey(flatten(
        options.entropy ? [seed, tostring(pool)] :
        (seed == null) ? autoseed() : seed, 3), key);

      // Use the seed to initialize an ARC4 generator.
      var arc4 = new ARC4(key);

      // This function returns a random double in [0, 1) that contains
      // randomness in every bit of the mantissa of the IEEE 754 value.
      var prng = function() {
        var n = arc4.g(chunks),             // Start with a numerator n < 2 ^ 48
            d = startdenom,                 //   and denominator d = 2 ^ 48.
            x = 0;                          //   and no 'extra last byte'.
        while (n < significance) {          // Fill up all significant digits by
          n = (n + x) * width;              //   shifting numerator and
          d *= width;                       //   denominator and generating a
          x = arc4.g(1);                    //   new least-significant-byte.
        }
        while (n >= overflow) {             // To avoid rounding up, before adding
          n /= 2;                           //   last byte, shift everything
          d /= 2;                           //   right using integer math until
          x >>>= 1;                         //   we have exactly the desired bits.
        }
        return (n + x) / d;                 // Form the number within [0, 1).
      };

      prng.int32 = function() { return arc4.g(4) | 0; };
      prng.quick = function() { return arc4.g(4) / 0x100000000; };
      prng.double = prng;

      // Mix the randomness into accumulated entropy.
      mixkey(tostring(arc4.S), pool);

      // Calling convention: what to return as a function of prng, seed, is_math.
      return (options.pass || callback ||
          function(prng, seed, is_math_call, state) {
            if (state) {
              // Load the arc4 state from the given state if it has an S array.
              if (state.S) { copy(state, arc4); }
              // Only provide the .state method if requested via options.state.
              prng.state = function() { return copy(arc4, {}); };
            }

            // If called as a method of Math (Math.seedrandom()), mutate
            // Math.random because that is how seedrandom.js has worked since v1.0.
            if (is_math_call) { math[rngname] = prng; return seed; }

            // Otherwise, it is a newer calling convention, so return the
            // prng directly.
            else return prng;
          })(
      prng,
      shortseed,
      'global' in options ? options.global : (this == math),
      options.state);
    }

    //
    // ARC4
    //
    // An ARC4 implementation.  The constructor takes a key in the form of
    // an array of at most (width) integers that should be 0 <= x < (width).
    //
    // The g(count) method returns a pseudorandom integer that concatenates
    // the next (count) outputs from ARC4.  Its return value is a number x
    // that is in the range 0 <= x < (width ^ count).
    //
    function ARC4(key) {
      var t, keylen = key.length,
          me = this, i = 0, j = me.i = me.j = 0, s = me.S = [];

      // The empty key [] is treated as [0].
      if (!keylen) { key = [keylen++]; }

      // Set up S using the standard key scheduling algorithm.
      while (i < width) {
        s[i] = i++;
      }
      for (i = 0; i < width; i++) {
        s[i] = s[j = mask & (j + key[i % keylen] + (t = s[i]))];
        s[j] = t;
      }

      // The "g" method returns the next (count) outputs as one number.
      (me.g = function(count) {
        // Using instance members instead of closure state nearly doubles speed.
        var t, r = 0,
            i = me.i, j = me.j, s = me.S;
        while (count--) {
          t = s[i = mask & (i + 1)];
          r = r * width + s[mask & ((s[i] = s[j = mask & (j + t)]) + (s[j] = t))];
        }
        me.i = i; me.j = j;
        return r;
        // For robust unpredictability, the function call below automatically
        // discards an initial batch of values.  This is called RC4-drop[256].
        // See http://google.com/search?q=rsa+fluhrer+response&btnI
      })(width);
    }

    //
    // copy()
    // Copies internal state of ARC4 to or from a plain object.
    //
    function copy(f, t) {
      t.i = f.i;
      t.j = f.j;
      t.S = f.S.slice();
      return t;
    }
    //
    // flatten()
    // Converts an object tree to nested arrays of strings.
    //
    function flatten(obj, depth) {
      var result = [], typ = (typeof obj), prop;
      if (depth && typ == 'object') {
        for (prop in obj) {
          try { result.push(flatten(obj[prop], depth - 1)); } catch (e) {}
        }
      }
      return (result.length ? result : typ == 'string' ? obj : obj + '\0');
    }

    //
    // mixkey()
    // Mixes a string seed into a key that is an array of integers, and
    // returns a shortened string seed that is equivalent to the result key.
    //
    function mixkey(seed, key) {
      var stringseed = seed + '', smear, j = 0;
      while (j < stringseed.length) {
        key[mask & j] =
          mask & ((smear ^= key[mask & j] * 19) + stringseed.charCodeAt(j++));
      }
      return tostring(key);
    }

    //
    // autoseed()
    // Returns an object for autoseeding, using window.crypto and Node crypto
    // module if available.
    //
    function autoseed() {
      try {
        var out;
        if (nodecrypto && (out = nodecrypto.randomBytes)) {
          // The use of 'out' to remember randomBytes makes tight minified code.
          out = out(width);
        } else {
          out = new Uint8Array(width);
          (global.crypto || global.msCrypto).getRandomValues(out);
        }
        return tostring(out);
      } catch (e) {
        var browser = global.navigator,
            plugins = browser && browser.plugins;
        return [+new Date, global, plugins, global.screen, tostring(pool)];
      }
    }

    //
    // tostring()
    // Converts an array of charcodes to a string
    //
    function tostring(a) {
      return String.fromCharCode.apply(0, a);
    }

    //
    // When seedrandom.js is loaded, we immediately mix a few bits
    // from the built-in RNG into the entropy pool.  Because we do
    // not want to interfere with deterministic PRNG state later,
    // seedrandom will not call math.random on its own again after
    // initialization.
    //
    mixkey(math.random(), pool);

    //
    // Nodejs and AMD support: export the implementation as a module using
    // either convention.
    //
    if (module.exports) {
      module.exports = seedrandom;
      // When in node.js, try using crypto package for autoseeding.
      try {
        nodecrypto = require('crypto');
      } catch (ex) {}
    } else {
      // When included as a plain script, set up Math.seedrandom global.
      math['seed' + rngname] = seedrandom;
    }


    // End anonymous scope, and pass initial values.
    })(
      // global: `self` in browsers (including strict mode and web workers),
      // otherwise `this` in Node and other environments
      (typeof self !== 'undefined') ? self : commonjsGlobal,
      [],     // pool: entropy pool starts empty
      Math    // math: package containing random, pow, and seedrandom
    );
    }(seedrandom$1));

    // A library of seedable RNGs implemented in Javascript.
    //
    // Usage:
    //
    // var seedrandom = require('seedrandom');
    // var random = seedrandom(1); // or any seed.
    // var x = random();       // 0 <= x < 1.  Every bit is random.
    // var x = random.quick(); // 0 <= x < 1.  32 bits of randomness.

    // alea, a 53-bit multiply-with-carry generator by Johannes Baagøe.
    // Period: ~2^116
    // Reported to pass all BigCrush tests.
    var alea = alea$1.exports;

    // xor128, a pure xor-shift generator by George Marsaglia.
    // Period: 2^128-1.
    // Reported to fail: MatrixRank and LinearComp.
    var xor128 = xor128$1.exports;

    // xorwow, George Marsaglia's 160-bit xor-shift combined plus weyl.
    // Period: 2^192-2^32
    // Reported to fail: CollisionOver, SimpPoker, and LinearComp.
    var xorwow = xorwow$1.exports;

    // xorshift7, by François Panneton and Pierre L'ecuyer, takes
    // a different approach: it adds robustness by allowing more shifts
    // than Marsaglia's original three.  It is a 7-shift generator
    // with 256 bits, that passes BigCrush with no systmatic failures.
    // Period 2^256-1.
    // No systematic BigCrush failures reported.
    var xorshift7 = xorshift7$1.exports;

    // xor4096, by Richard Brent, is a 4096-bit xor-shift with a
    // very long period that also adds a Weyl generator. It also passes
    // BigCrush with no systematic failures.  Its long period may
    // be useful if you have many generators and need to avoid
    // collisions.
    // Period: 2^4128-2^32.
    // No systematic BigCrush failures reported.
    var xor4096 = xor4096$1.exports;

    // Tyche-i, by Samuel Neves and Filipe Araujo, is a bit-shifting random
    // number generator derived from ChaCha, a modern stream cipher.
    // https://eden.dei.uc.pt/~sneves/pubs/2011-snfa2.pdf
    // Period: ~2^127
    // No systematic BigCrush failures reported.
    var tychei = tychei$1.exports;

    // The original ARC4-based prng included in this library.
    // Period: ~2^1600
    var sr = seedrandom$1.exports;

    sr.alea = alea;
    sr.xor128 = xor128;
    sr.xorwow = xorwow;
    sr.xorshift7 = xorshift7;
    sr.xor4096 = xor4096;
    sr.tychei = tychei;

    var seedrandom = sr;

    var GameMode;
    (function (GameMode) {
        GameMode[GameMode["daily"] = 0] = "daily";
        GameMode[GameMode["hourly"] = 1] = "hourly";
        GameMode[GameMode["infinite"] = 2] = "infinite";
    })(GameMode || (GameMode = {}));
    var ms;
    (function (ms) {
        ms[ms["SECOND"] = 1000] = "SECOND";
        ms[ms["MINUTE"] = 60000] = "MINUTE";
        ms[ms["HOUR"] = 3600000] = "HOUR";
        ms[ms["DAY"] = 86400000] = "DAY";
    })(ms || (ms = {}));

    const words$1 = { 'active_words': [], 'food': ['sushi', 'salad', 'kebab', 'vodka', 'peach', 'sugar', 'brine', 'olive', 'cacao', 'fungi', 'thyme', 'mocha', 'apple', 'honey', 'onion', 'icing', 'candy', 'grape', 'trout', 'filet', 'donut', 'bread', 'ramen', 'steak', 'caper', 'pizza', 'conch', 'cumin', 'gravy', 'creme', 'flour', 'toast', 'scone', 'syrup', 'cocoa', 'maize', 'mango', 'chili', 'pesto', 'salsa', 'crepe', 'water', 'bagel', 'melon', 'pasta', 'basil', 'taffy', 'wafer', 'bacon', 'wheat', 'berry', 'sauce', 'fruit', 'curry', 'pecan', 'latte', 'lemon', 'fudge', 'guava', 'beets', 'nacho', 'satay', 'tacos', 'jello', 'chive', 'oreos', 'bhaji', 'torte', 'ugali', 'beans', 'ranch', 'mochi', 'latke', 'queso', 'fries', 'mints', 'dates', 'prune', 'rujak', 'baozi'], 'words': ['fresh', 'crust', 'serve', 'flesh', 'seedy', 'corny', 'salad', 'spicy', 'kebab', 'vodka', 'peach', 'drink', 'tangy', 'sugar', 'aroma', 'shake', 'spill', 'brine', 'sweet', 'mince', 'olive', 'zesty', 'scrap', 'apron', 'cacao', 'bland', 'quart', 'smear', 'patty', 'hunky', 'treat', 'fungi', 'booze', 'thyme', 'grate', 'soggy', 'enjoy', 'mocha', 'smoke', 'lunch', 'paste', 'carve', 'apple', 'honey', 'cream', 'diner', 'onion', 'juicy', 'icing', 'whisk', 'sushi', 'candy', 'grape', 'burnt', 'dough', 'trout', 'filet', 'donut', 'bread', 'dairy', 'tasty', 'puree', 'diary', 'penne', 'ramen', 'fishy', 'steak', 'caper', 'pizza', 'plate', 'broil', 'cumin', 'gravy', 'yeast', 'cider', 'creme', 'grill', 'flour', 'beefy', 'scone', 'toast', 'saucy', 'spice', 'feast', 'syrup', 'maize', 'cocoa', 'mango', 'chili', 'salty', 'pesto', 'salsa', 'spoon', 'crepe', 'water', 'briny', 'bagel', 'melon', 'pasta', 'taffy', 'basil', 'wafer', 'snack', 'bacon', 'juice', 'wheat', 'berry', 'fruit', 'sauce', 'fried', 'baste', 'pecan', 'curry', 'lemon', 'latte', 'broth', 'guava', 'fudge', 'femur', 'gourd', 'umami', 'rolls', 'gumbo', 'beets', 'maple', 'satay', 'nacho', 'knife', 'grits', 'nutty', 'crumb', 'tacos', 'dashi', 'jello', 'mirin', 'wings', 'chive', 'dried', 'tapas', 'beers', 'chewy', 'rinds', 'yummy', 'stock', 'tater', 'slice', 'morel', 'tuile', 'farro', 'saute', 'flans', 'oreos', 'heinz', 'bhaji', 'torte', 'crisp', 'chips', 'anise', 'punch', 'tuber', 'ugali', 'ladle', 'beans', 'spuds', 'stove', 'spork', 'herbs', 'lager', 'seeds', 'namul', 'lassi', 'ranch', 'cater', 'manti', 'straw', 'grain', 'crabs', 'jelly', 'adobo', 'taste', 'pilaf', 'mochi', 'vegan', 'latke', 'queso', 'curds', 'roast', 'fries', 'chard', 'mints', 'minty', 'dates', 'clams', 'prune', 'aspic', 'rujak', 'gummy', 'cakes', 'baozi', 'melty'], 'valid': ['aahed', 'aalii', 'aargh', 'aaron', 'abaca', 'abaci', 'aback', 'abada', 'abaff', 'abaft', 'abaka', 'abama', 'abamp', 'aband', 'abase', 'abash', 'abask', 'abate', 'abaue', 'abave', 'abaze', 'abbas', 'abbey', 'abbes', 'abbie', 'abbot', 'abdal', 'abdat', 'abdom', 'abeam', 'abear', 'abede', 'abele', 'abend', 'aberr', 'abets', 'abhor', 'abide', 'abidi', 'abies', 'abyes', 'abilo', 'abime', 'abysm', 'abyss', 'abkar', 'abler', 'ables', 'ablet', 'ablow', 'abmho', 'abner', 'abnet', 'abode', 'abody', 'abohm', 'aboil', 'aboma', 'aboon', 'abord', 'abort', 'abote', 'about', 'above', 'abray', 'abram', 'abret', 'abrim', 'abrin', 'abris', 'abrus', 'absee', 'absey', 'absis', 'absit', 'abstr', 'abuna', 'abune', 'abura', 'abuse', 'abush', 'abuta', 'abuts', 'abuzz', 'abwab', 'acale', 'acana', 'acapu', 'acara', 'acari', 'acast', 'acate', 'accel', 'accoy', 'accra', 'accts', 'accum', 'accur', 'accus', 'acedy', 'acerb', 'aceta', 'achar', 'ached', 'achen', 'acher', 'aches', 'achoo', 'achor', 'acidy', 'acids', 'acier', 'acies', 'acyls', 'acing', 'acini', 'ackee', 'ackey', 'acker', 'aclys', 'acmes', 'acmic', 'acned', 'acnes', 'acock', 'acoin', 'acold', 'acoma', 'acone', 'acool', 'acorn', 'acost', 'acoup', 'acrab', 'acred', 'acres', 'acrid', 'acryl', 'acroa', 'acron', 'acrux', 'acted', 'actin', 'acton', 'actor', 'actos', 'actus', 'acuan', 'acute', 'adage', 'adagy', 'adays', 'adams', 'adapa', 'adapt', 'adati', 'adaty', 'adawe', 'adawn', 'adcon', 'addax', 'addda', 'added', 'adder', 'addie', 'addio', 'addis', 'addle', 'addnl', 'adead', 'adeem', 'adeep', 'adela', 'adeps', 'adept', 'adfix', 'adiel', 'adieu', 'adion', 'adios', 'adyta', 'adits', 'adjag', 'adlai', 'adlay', 'adlet', 'adman', 'admen', 'admin', 'admit', 'admix', 'admov', 'admrx', 'adnex', 'adobe', 'adolf', 'adopt', 'adore', 'adorn', 'adown', 'adoxa', 'adoxy', 'adoze', 'adpao', 'adrad', 'adret', 'adrip', 'adrop', 'adrue', 'adsum', 'adult', 'adunc', 'adure', 'adusk', 'adust', 'adzer', 'adzes', 'aecia', 'aedes', 'aeger', 'aegir', 'aegis', 'aegle', 'aeons', 'aequi', 'aeric', 'aerie', 'aeron', 'aesir', 'aesop', 'aetat', 'aevia', 'aevum', 'aface', 'afara', 'afars', 'afear', 'affix', 'afgod', 'afifi', 'afire', 'aflat', 'afley', 'aflow', 'afoam', 'afoot', 'afore', 'afoul', 'afray', 'afret', 'afric', 'afrit', 'afros', 'after', 'agada', 'agade', 'again', 'agama', 'agami', 'agamy', 'agape', 'agars', 'agasp', 'agast', 'agata', 'agate', 'agaty', 'agave', 'agaze', 'agena', 'agend', 'agene', 'agent', 'agers', 'agete', 'agger', 'aggie', 'aggry', 'aggro', 'aggur', 'aghan', 'aghas', 'agiel', 'agile', 'aging', 'agios', 'agism', 'agist', 'aglee', 'agley', 'aglet', 'aglow', 'agmas', 'agnat', 'agnel', 'agnes', 'agnus', 'agoge', 'agoho', 'agone', 'agony', 'agons', 'agora', 'agrah', 'agral', 'agree', 'agria', 'agric', 'agrin', 'agrom', 'agron', 'agsam', 'aguey', 'agues', 'agura', 'agush', 'agust', 'ahead', 'aheap', 'ahems', 'ahind', 'ahint', 'ahmed', 'ahmet', 'ahold', 'aholt', 'ahong', 'ahsan', 'ahull', 'ahunt', 'ahura', 'ahush', 'ahwal', 'ayahs', 'aided', 'aider', 'aides', 'ayelp', 'ayens', 'aiery', 'aiger', 'aigre', 'ayins', 'ailed', 'aylet', 'ailie', 'aillt', 'ayllu', 'aimak', 'aimed', 'aimee', 'aimer', 'ainee', 'ainoi', 'ainus', 'aioli', 'ayond', 'ayont', 'ayous', 'airan', 'aired', 'airer', 'airns', 'airth', 'airts', 'aisle', 'aitch', 'aitis', 'ayuyu', 'aiver', 'aiwan', 'aizle', 'ajaja', 'ajari', 'ajava', 'ajhar', 'ajiva', 'ajuga', 'akala', 'akali', 'akasa', 'akebi', 'akees', 'akeki', 'akela', 'akene', 'aking', 'akkad', 'aknee', 'aknow', 'akpek', 'akron', 'akule', 'akund', 'alack', 'alada', 'alain', 'alaki', 'alala', 'alamo', 'aland', 'alane', 'alang', 'alani', 'alans', 'alant', 'alapa', 'alary', 'alarm', 'alate', 'alawi', 'alban', 'albas', 'albee', 'albin', 'albyn', 'album', 'albus', 'alcae', 'alces', 'alcid', 'alcor', 'alday', 'aldea', 'alden', 'alder', 'aldim', 'aldol', 'aldus', 'aleak', 'aleck', 'alecs', 'alefs', 'aleft', 'alenu', 'aleph', 'alert', 'aleut', 'alfas', 'alfet', 'alfin', 'alfur', 'algae', 'algal', 'algas', 'algic', 'algid', 'algin', 'algol', 'algor', 'algum', 'alhet', 'alias', 'alibi', 'alice', 'alick', 'alida', 'alids', 'alien', 'aliet', 'alife', 'alifs', 'align', 'aliya', 'alike', 'alima', 'aline', 'alish', 'aliso', 'alisp', 'alist', 'alite', 'ality', 'alive', 'alkes', 'alkyd', 'alkyl', 'alkin', 'allah', 'allay', 'allan', 'alley', 'allen', 'aller', 'allez', 'allie', 'allyl', 'allis', 'allod', 'alloy', 'alloo', 'allot', 'allow', 'almah', 'alman', 'almas', 'almeh', 'almes', 'almon', 'almud', 'almug', 'alnus', 'alody', 'aloed', 'aloes', 'aloft', 'alogy', 'aloha', 'aloid', 'aloin', 'alois', 'aloma', 'alone', 'along', 'aloof', 'alosa', 'alose', 'aloud', 'alout', 'alowe', 'alpax', 'alpen', 'alpha', 'alpid', 'altar', 'alter', 'altho', 'altin', 'altos', 'altun', 'altus', 'aluco', 'alula', 'alums', 'alure', 'aluta', 'alvah', 'alvan', 'alvar', 'alvia', 'alvin', 'alvus', 'alway', 'amaas', 'amadi', 'amaga', 'amahs', 'amain', 'amala', 'amalg', 'amang', 'amani', 'amant', 'amapa', 'amara', 'amass', 'amate', 'amati', 'amaut', 'amaze', 'ambay', 'amban', 'ambar', 'ambas', 'amber', 'ambit', 'amble', 'ambon', 'ambos', 'ambry', 'ameba', 'ameed', 'ameen', 'ameer', 'amelu', 'amend', 'amene', 'amens', 'ament', 'amess', 'amhar', 'amias', 'amice', 'amici', 'amide', 'amido', 'amids', 'amies', 'amiga', 'amigo', 'amylo', 'amyls', 'amine', 'amini', 'amino', 'amins', 'amire', 'amirs', 'amish', 'amiss', 'amita', 'amity', 'amlet', 'amman', 'ammer', 'ammos', 'amnia', 'amnic', 'amoke', 'amoks', 'amole', 'among', 'amora', 'amort', 'amour', 'amove', 'amowt', 'amper', 'amphi', 'ampyx', 'ample', 'amply', 'ampul', 'amrit', 'amsel', 'amuck', 'amula', 'amuse', 'amuze', 'amvis', 'amzel', 'anabo', 'anack', 'anama', 'anana', 'anasa', 'ancha', 'ancle', 'ancon', 'ancor', 'ancre', 'andes', 'andia', 'andor', 'andre', 'anear', 'anele', 'anend', 'anent', 'angas', 'angel', 'anger', 'angia', 'angie', 'angka', 'angle', 'anglo', 'angor', 'angry', 'angst', 'angus', 'anhyd', 'aniba', 'anice', 'anigh', 'anile', 'anils', 'anima', 'anime', 'animi', 'animo', 'anion', 'anita', 'anjan', 'anjou', 'ankee', 'anker', 'ankhs', 'ankle', 'ankou', 'ankus', 'anlas', 'anlet', 'anlia', 'anmia', 'annal', 'annam', 'annas', 'annat', 'annet', 'annex', 'annie', 'anniv', 'annoy', 'annot', 'annul', 'annum', 'annus', 'anoas', 'anode', 'anoia', 'anoil', 'anole', 'anoli', 'anomy', 'anorn', 'anour', 'anous', 'anova', 'ansae', 'ansar', 'ansel', 'anser', 'antae', 'antal', 'antar', 'antas', 'anted', 'antes', 'antic', 'antiq', 'antis', 'anton', 'antra', 'antre', 'antsy', 'antum', 'anura', 'anury', 'anvil', 'anzac', 'aoife', 'aorta', 'aotea', 'aotes', 'aotus', 'aouad', 'apace', 'apaid', 'apair', 'apama', 'apart', 'apass', 'apast', 'apeak', 'apeek', 'apery', 'apers', 'apert', 'aperu', 'aphid', 'aphis', 'aphra', 'apian', 'apiin', 'apili', 'apina', 'aping', 'apiol', 'apios', 'apish', 'apism', 'apium', 'apnea', 'apoda', 'apods', 'apoop', 'aport', 'apout', 'appay', 'appal', 'appar', 'appel', 'appet', 'apply', 'appmt', 'appro', 'apptd', 'appui', 'apres', 'april', 'apses', 'apsid', 'apsis', 'aptal', 'apter', 'aptly', 'aquae', 'aquas', 'araba', 'araby', 'arabs', 'araca', 'arace', 'arach', 'arado', 'arage', 'arain', 'arake', 'araks', 'aramu', 'arank', 'arara', 'araru', 'arase', 'arati', 'araua', 'arawa', 'arber', 'arbor', 'arcae', 'arced', 'arces', 'archd', 'arche', 'archy', 'archt', 'arcos', 'arcus', 'ardea', 'ardeb', 'arder', 'ardor', 'ardri', 'aread', 'areae', 'areal', 'arean', 'arear', 'areas', 'areca', 'areek', 'areel', 'arefy', 'areic', 'arena', 'arend', 'areng', 'arent', 'arere', 'arest', 'arete', 'argal', 'argan', 'argas', 'argel', 'argid', 'argil', 'argin', 'argle', 'argol', 'argon', 'argos', 'argot', 'argue', 'argus', 'arhar', 'arhat', 'arian', 'aryan', 'arias', 'ariel', 'aries', 'ariki', 'arils', 'aryls', 'arioi', 'arion', 'ariot', 'arise', 'arish', 'arist', 'arite', 'arith', 'arius', 'arjun', 'arkab', 'arkie', 'arles', 'armed', 'armer', 'armet', 'armil', 'armit', 'armor', 'arneb', 'arnee', 'arnut', 'aroar', 'arock', 'aroid', 'aroon', 'aroph', 'arose', 'arpen', 'arrah', 'array', 'arras', 'arrau', 'arret', 'arrgt', 'arrha', 'arrie', 'arris', 'arrow', 'arroz', 'arses', 'arsyl', 'arsis', 'arsle', 'arson', 'artal', 'artar', 'artel', 'arter', 'artha', 'artic', 'artie', 'artly', 'artou', 'artsy', 'artus', 'aruac', 'aruke', 'arulo', 'arums', 'arupa', 'arusa', 'arval', 'arvel', 'arvos', 'arzan', 'arzun', 'asale', 'asana', 'asaph', 'asarh', 'ascan', 'ascii', 'ascon', 'ascot', 'ascry', 'ascus', 'asdic', 'asgmt', 'ashed', 'ashen', 'asher', 'ashes', 'ashet', 'ashir', 'ashot', 'ashur', 'asian', 'aside', 'asyla', 'asyle', 'async', 'askar', 'asked', 'asker', 'askew', 'askip', 'askoi', 'askos', 'aslop', 'asoak', 'asoka', 'aspca', 'aspen', 'asper', 'aspis', 'assai', 'assay', 'assam', 'asses', 'asset', 'assis', 'assoc', 'assot', 'astay', 'astel', 'aster', 'astir', 'astor', 'astre', 'astur', 'asuri', 'asway', 'aswim', 'atake', 'atame', 'atavi', 'ataxy', 'ateba', 'atees', 'ately', 'atelo', 'athar', 'athel', 'atilt', 'atimy', 'ating', 'atypy', 'atlas', 'atlee', 'atman', 'atmas', 'atmid', 'atmos', 'atnah', 'atoke', 'atole', 'atoll', 'atomy', 'atoms', 'atone', 'atony', 'atopy', 'atour', 'atren', 'atria', 'atrip', 'attal', 'attar', 'atter', 'attic', 'attid', 'attle', 'attry', 'atule', 'atune', 'atwin', 'aubin', 'aucan', 'aucht', 'audad', 'audio', 'audit', 'aueto', 'augen', 'auger', 'auget', 'aught', 'augur', 'aulae', 'aulas', 'aulic', 'auloi', 'aulos', 'aumil', 'aunty', 'aunts', 'aurae', 'aural', 'aurar', 'auras', 'aurei', 'aures', 'auric', 'auryl', 'aurin', 'aurir', 'auris', 'aurum', 'autem', 'autor', 'autos', 'autre', 'auxil', 'auxin', 'avahi', 'avail', 'avale', 'avant', 'avars', 'avast', 'avell', 'avena', 'aveny', 'avens', 'avera', 'avery', 'avern', 'avers', 'avert', 'avgas', 'avian', 'avick', 'aview', 'avile', 'avine', 'avion', 'aviso', 'avoid', 'avoir', 'avoke', 'avoue', 'avour', 'avowe', 'avows', 'awabi', 'awacs', 'awaft', 'aways', 'await', 'awake', 'awald', 'awalt', 'awane', 'award', 'aware', 'awarn', 'awash', 'awave', 'awber', 'aweek', 'aweel', 'awest', 'aweto', 'awful', 'awhet', 'awhir', 'awide', 'awing', 'awink', 'awiwi', 'awkly', 'awned', 'awner', 'awoke', 'awols', 'awork', 'axels', 'axers', 'axial', 'axile', 'axils', 'axine', 'axing', 'axiom', 'axion', 'axite', 'axled', 'axles', 'axman', 'axmen', 'axoid', 'axone', 'axons', 'azans', 'azide', 'azido', 'azyme', 'azine', 'azlon', 'azoch', 'azofy', 'azoic', 'azole', 'azons', 'azote', 'azoth', 'azoxy', 'aztec', 'azure', 'azury', 'baaed', 'baals', 'babai', 'babas', 'babby', 'babel', 'babes', 'babis', 'babka', 'bable', 'baboo', 'babua', 'babul', 'babus', 'bacao', 'bacca', 'baccy', 'bache', 'bacin', 'bacis', 'backy', 'backs', 'badan', 'baddy', 'badge', 'badju', 'badly', 'badon', 'baffy', 'baffs', 'bafta', 'bagdi', 'bagge', 'baggy', 'bagie', 'bagio', 'bagle', 'bagne', 'bagre', 'bahai', 'bahay', 'baham', 'bahan', 'bahar', 'bahoe', 'bahoo', 'bahts', 'bahur', 'bahut', 'bayal', 'bayed', 'baign', 'baile', 'bailo', 'bails', 'baioc', 'bayok', 'bayou', 'bairn', 'baith', 'baits', 'baiza', 'baize', 'bajan', 'bajau', 'bajra', 'bajri', 'bakal', 'baked', 'baken', 'baker', 'bakes', 'bakie', 'bakli', 'bakra', 'balai', 'balak', 'balan', 'balao', 'balas', 'balat', 'balau', 'baldy', 'balds', 'baled', 'balei', 'baler', 'bales', 'balky', 'balks', 'balli', 'bally', 'ballo', 'balls', 'balmy', 'balms', 'balon', 'baloo', 'balor', 'balow', 'balsa', 'balti', 'balun', 'balut', 'balza', 'bamah', 'banak', 'banal', 'banat', 'banba', 'banca', 'banco', 'banda', 'bande', 'bandh', 'bandi', 'bandy', 'bando', 'bands', 'baned', 'banes', 'banff', 'banga', 'bange', 'bangy', 'bangs', 'bania', 'banya', 'banig', 'banjo', 'banky', 'banks', 'banns', 'banty', 'bantu', 'banus', 'barad', 'barat', 'barba', 'barbe', 'barbs', 'barbu', 'barde', 'bardy', 'bardo', 'bards', 'bared', 'barer', 'bares', 'baret', 'barff', 'barfy', 'barfs', 'barge', 'bargh', 'baria', 'baric', 'barid', 'barie', 'barye', 'barih', 'baris', 'barit', 'barky', 'barks', 'barly', 'barmy', 'barms', 'barny', 'barns', 'baroi', 'baron', 'barra', 'barre', 'barry', 'barse', 'barth', 'basad', 'basal', 'basan', 'basat', 'based', 'baser', 'bases', 'basic', 'basyl', 'basin', 'basis', 'baske', 'basks', 'bason', 'basos', 'bassa', 'bassi', 'bassy', 'basso', 'basta', 'basti', 'basto', 'basts', 'batad', 'batak', 'batan', 'batch', 'batea', 'bated', 'batel', 'bater', 'bates', 'bathe', 'baths', 'batik', 'batis', 'baton', 'batta', 'batty', 'batts', 'battu', 'batwa', 'baubo', 'bauch', 'bauds', 'bauge', 'bauld', 'baulk', 'baume', 'bauno', 'baure', 'bauta', 'bavin', 'bawdy', 'bawds', 'bawke', 'bawly', 'bawls', 'bawra', 'bawty', 'bazar', 'bazoo', 'beach', 'beady', 'beads', 'beaky', 'beaks', 'beala', 'beamy', 'beams', 'beany', 'beano', 'beant', 'beard', 'bearm', 'bears', 'beast', 'beata', 'beath', 'beati', 'beats', 'beaus', 'beaut', 'beaux', 'bebay', 'bebar', 'bebat', 'bebed', 'bebog', 'bebop', 'becap', 'becco', 'beche', 'becky', 'becks', 'becry', 'becut', 'bedad', 'beday', 'bedel', 'beden', 'bedew', 'bedye', 'bedim', 'bedin', 'bedip', 'bedog', 'bedot', 'bedub', 'bedur', 'beech', 'beedi', 'beefs', 'beele', 'beent', 'beeps', 'beery', 'beest', 'beeth', 'beety', 'beeve', 'befan', 'befit', 'befog', 'befop', 'befur', 'begad', 'begay', 'began', 'begar', 'begat', 'begem', 'beget', 'begin', 'begob', 'begod', 'begot', 'begum', 'begun', 'begut', 'behap', 'behav', 'behen', 'behew', 'beice', 'beige', 'beigy', 'beild', 'being', 'beira', 'beisa', 'bejan', 'bejel', 'bejig', 'bekah', 'bekko', 'belah', 'belay', 'belam', 'belap', 'belar', 'belat', 'belch', 'belee', 'belga', 'belie', 'belis', 'bella', 'belle', 'belli', 'belly', 'bello', 'bells', 'below', 'belts', 'belue', 'belve', 'bemad', 'beman', 'bemar', 'bemas', 'bemat', 'bemba', 'bemix', 'bemol', 'bemud', 'benab', 'bench', 'benda', 'bendy', 'bends', 'benes', 'benet', 'benic', 'benim', 'benin', 'benjy', 'benne', 'benni', 'benny', 'bensh', 'benty', 'bents', 'benzo', 'beode', 'bepat', 'bepaw', 'bepen', 'bepun', 'beray', 'berat', 'beret', 'bergh', 'bergy', 'bergs', 'beryl', 'beryx', 'berme', 'berms', 'berne', 'berob', 'beroe', 'berri', 'berth', 'berun', 'besan', 'besee', 'beset', 'besew', 'besin', 'besit', 'besom', 'besot', 'bespy', 'besra', 'bessi', 'bessy', 'bests', 'betag', 'betas', 'betel', 'betes', 'beths', 'betis', 'beton', 'betsy', 'betso', 'betta', 'betty', 'bevel', 'bever', 'bevil', 'bevor', 'bevue', 'bevvy', 'bewet', 'bewig', 'bewit', 'bewry', 'bezan', 'bezel', 'bezil', 'bezzi', 'bezzo', 'bhaga', 'bhalu', 'bhang', 'bhara', 'bhava', 'bhili', 'bhima', 'bhoot', 'bhuts', 'biabo', 'biali', 'bialy', 'byard', 'bibby', 'bibbs', 'bibio', 'bible', 'bicep', 'bices', 'bichy', 'bidar', 'biddy', 'bided', 'bider', 'bides', 'bidet', 'bidri', 'bidry', 'bield', 'biens', 'biers', 'bifer', 'biffy', 'biffs', 'bifid', 'bigae', 'bigam', 'bigas', 'biggy', 'bigha', 'bight', 'bigly', 'bigot', 'bihai', 'biham', 'bijou', 'biked', 'biker', 'bikes', 'bikie', 'bikol', 'bylaw', 'bilbi', 'bilby', 'bilbo', 'bilch', 'biles', 'bilge', 'bilgy', 'bilic', 'bilin', 'bilio', 'bilks', 'billa', 'billy', 'bills', 'bilos', 'bilsh', 'bimah', 'bimas', 'bimbo', 'binal', 'bindi', 'binds', 'bines', 'binge', 'bingy', 'bingo', 'bynin', 'binit', 'binna', 'binny', 'bints', 'biome', 'biont', 'biose', 'biota', 'byous', 'biped', 'bipod', 'birch', 'birde', 'birdy', 'birds', 'byres', 'birky', 'birks', 'birle', 'birls', 'byrls', 'birma', 'birne', 'birny', 'biron', 'byron', 'birri', 'byrri', 'birrs', 'birse', 'birsy', 'birth', 'bysen', 'bises', 'biset', 'bisie', 'bisks', 'bisme', 'bison', 'byssi', 'bisso', 'bisti', 'bitch', 'bited', 'biter', 'bites', 'bytes', 'bitis', 'bitsy', 'bitte', 'bitty', 'bitts', 'biune', 'bivvy', 'byway', 'bixin', 'bizel', 'bizen', 'bizes', 'bizet', 'blabs', 'black', 'blade', 'blady', 'blaff', 'blahs', 'blayk', 'blain', 'blair', 'blake', 'blame', 'blams', 'blanc', 'blank', 'blare', 'blart', 'blase', 'blash', 'blast', 'blate', 'blats', 'blawn', 'blaws', 'blaze', 'blazy', 'bleak', 'blear', 'bleat', 'blebs', 'bleck', 'bleed', 'bleep', 'blend', 'blenk', 'blens', 'blent', 'blere', 'bless', 'blest', 'blets', 'blibe', 'blick', 'blier', 'blimy', 'blimp', 'blind', 'blini', 'bliny', 'blink', 'blype', 'blips', 'blirt', 'bliss', 'blist', 'blite', 'blitz', 'blizz', 'bloat', 'blobs', 'block', 'blocs', 'bloke', 'blond', 'blood', 'bloom', 'bloop', 'blore', 'blote', 'blots', 'blout', 'blowy', 'blown', 'blows', 'blued', 'bluey', 'bluer', 'blues', 'bluet', 'bluff', 'blume', 'blunk', 'blunt', 'blurb', 'blurs', 'blurt', 'blush', 'board', 'boars', 'boart', 'boast', 'boats', 'bobac', 'bobby', 'bobet', 'bobol', 'bocal', 'bocca', 'bocce', 'bocci', 'boche', 'bocks', 'bocoy', 'boded', 'boden', 'boder', 'bodes', 'bodge', 'bodhi', 'bodle', 'boers', 'boffo', 'boffs', 'bogan', 'bogey', 'boget', 'boggy', 'bogie', 'bogle', 'bogue', 'bogum', 'bogus', 'bohea', 'bohor', 'boyar', 'boyau', 'boyce', 'boyer', 'boiko', 'boyla', 'boily', 'boils', 'boing', 'boyos', 'boise', 'boist', 'boite', 'bokom', 'bokos', 'bolag', 'bolar', 'bolas', 'boldo', 'boldu', 'boled', 'boles', 'bolis', 'bolly', 'bolls', 'bolos', 'bolti', 'bolty', 'bolts', 'bolus', 'bombe', 'bombo', 'bombs', 'bomos', 'bonav', 'bonbo', 'bonce', 'bonds', 'boned', 'boney', 'boner', 'bones', 'bongo', 'bongs', 'bonks', 'bonne', 'bonny', 'bonos', 'bonum', 'bonus', 'bonze', 'booby', 'boobs', 'boodh', 'boody', 'booed', 'booky', 'books', 'booly', 'boomy', 'booms', 'boone', 'boong', 'boonk', 'boons', 'boors', 'boort', 'boose', 'boosy', 'boost', 'booth', 'booty', 'boots', 'boozy', 'borak', 'boral', 'boran', 'boras', 'borax', 'bored', 'boree', 'borel', 'borer', 'bores', 'borgh', 'boric', 'borid', 'boryl', 'boris', 'borne', 'boron', 'borty', 'borts', 'bortz', 'bosch', 'bosey', 'boser', 'bosky', 'bosks', 'bosom', 'boson', 'bossa', 'bossy', 'bosun', 'botan', 'botas', 'botch', 'botel', 'bothy', 'botry', 'botte', 'botts', 'bottu', 'bouch', 'boucl', 'bouet', 'bouge', 'bough', 'boule', 'boult', 'bound', 'bourd', 'bourg', 'bourn', 'bourr', 'bouse', 'bousy', 'bouto', 'bouts', 'bovey', 'bovid', 'bovld', 'bowed', 'bowel', 'bower', 'bowet', 'bowge', 'bowie', 'bowla', 'bowle', 'bowly', 'bowls', 'bowne', 'bowse', 'boxed', 'boxen', 'boxer', 'boxes', 'boxty', 'bozal', 'bozos', 'bozze', 'braca', 'brace', 'brach', 'brack', 'bract', 'brads', 'braes', 'bragi', 'brags', 'brahm', 'braid', 'braye', 'brail', 'brain', 'brays', 'brake', 'braky', 'brame', 'brand', 'brank', 'brans', 'brant', 'brash', 'brass', 'brast', 'brats', 'brava', 'brave', 'bravi', 'bravo', 'brawl', 'brawn', 'braws', 'braxy', 'braza', 'braze', 'break', 'bream', 'breba', 'breck', 'brede', 'bredi', 'breed', 'breek', 'brees', 'breme', 'brens', 'brent', 'brerd', 'brere', 'brest', 'breth', 'brett', 'breva', 'breve', 'brevi', 'brews', 'brian', 'bryan', 'briar', 'bribe', 'bryce', 'brick', 'bride', 'brief', 'brier', 'bries', 'brigs', 'brike', 'brill', 'brims', 'bring', 'brink', 'brins', 'bryon', 'brios', 'brisa', 'brise', 'brisk', 'briss', 'brist', 'brite', 'brith', 'brits', 'britt', 'bryum', 'briza', 'brizz', 'broad', 'broch', 'brock', 'brogh', 'broid', 'broke', 'broll', 'broma', 'brome', 'bromo', 'bronc', 'bronk', 'bronx', 'brood', 'brook', 'brool', 'broom', 'broon', 'broos', 'brose', 'brosy', 'brott', 'browd', 'brown', 'brows', 'brubu', 'bruce', 'bruet', 'brugh', 'bruin', 'bruit', 'bruja', 'brujo', 'bruke', 'brule', 'brume', 'brune', 'bruno', 'brunt', 'brush', 'brusk', 'bruta', 'brute', 'bruzz', 'btise', 'buaze', 'bubal', 'bubas', 'bubba', 'bubby', 'bubos', 'bucca', 'bucco', 'buchu', 'bucky', 'bucko', 'bucks', 'bucku', 'buddh', 'buddy', 'budge', 'budgy', 'bueno', 'buffa', 'buffe', 'buffi', 'buffy', 'buffo', 'buffs', 'bugan', 'buggy', 'bught', 'bugle', 'bugre', 'buhls', 'buhrs', 'buick', 'buyer', 'build', 'built', 'buist', 'bukat', 'bulak', 'bulby', 'bulbs', 'bulge', 'bulgy', 'bulky', 'bulks', 'bulla', 'bully', 'bulls', 'bulse', 'bumbo', 'bumfs', 'bumph', 'bumpy', 'bumps', 'bunce', 'bunch', 'bunco', 'bunda', 'bundh', 'bundy', 'bunds', 'bundt', 'bundu', 'bunga', 'bungy', 'bungo', 'bungs', 'bunya', 'bunko', 'bunks', 'bunny', 'bunns', 'bunty', 'bunts', 'buoys', 'buran', 'burao', 'buras', 'burbs', 'burds', 'burel', 'buret', 'burez', 'burga', 'burge', 'burgh', 'burgs', 'burin', 'burys', 'burka', 'burke', 'burly', 'burls', 'burma', 'burny', 'burns', 'buroo', 'burps', 'burry', 'burro', 'burrs', 'bursa', 'burse', 'burst', 'burut', 'busby', 'bused', 'buses', 'bushi', 'bushy', 'busky', 'busks', 'bussy', 'bussu', 'busti', 'busty', 'busto', 'busts', 'butat', 'butch', 'butea', 'buteo', 'butic', 'butyl', 'butin', 'butyn', 'butyr', 'butle', 'butsu', 'butte', 'butty', 'butts', 'butut', 'buxom', 'buxus', 'buzzy', 'bwana', 'caaba', 'caama', 'cabaa', 'cabal', 'caban', 'cabas', 'cabby', 'cabda', 'caber', 'cabin', 'cabio', 'cable', 'cabob', 'cabot', 'cabre', 'cacam', 'cacan', 'cacas', 'cacei', 'cache', 'cacks', 'cacti', 'cacur', 'caddy', 'caddo', 'cadee', 'cader', 'cades', 'cadet', 'cadew', 'cadge', 'cadgy', 'cadie', 'cadis', 'cados', 'cadre', 'cadua', 'cadus', 'caeca', 'cafes', 'caffa', 'cafiz', 'cafoy', 'caged', 'cagey', 'cager', 'cages', 'caggy', 'cagit', 'cagot', 'cagui', 'cahiz', 'cahot', 'cahow', 'cahuy', 'caids', 'cains', 'cayos', 'caird', 'cairn', 'cairo', 'caite', 'cajan', 'cajon', 'cajou', 'cajun', 'caked', 'cakey', 'caker', 'cakra', 'calas', 'calci', 'caleb', 'calef', 'calfs', 'calic', 'calid', 'calif', 'calin', 'calix', 'calyx', 'calks', 'calla', 'calli', 'callo', 'calls', 'calmy', 'calms', 'calor', 'calve', 'camay', 'caman', 'camas', 'camel', 'cameo', 'cames', 'camis', 'camla', 'campa', 'campe', 'campi', 'campy', 'campo', 'camps', 'camus', 'canal', 'canap', 'canch', 'caned', 'canel', 'caner', 'canes', 'cangy', 'canid', 'canis', 'canli', 'canna', 'canny', 'canoe', 'canon', 'canos', 'canso', 'canst', 'canty', 'canto', 'cants', 'canun', 'canzo', 'caoba', 'capax', 'caped', 'capel', 'capes', 'caphs', 'capoc', 'capon', 'capos', 'capot', 'cappy', 'capra', 'capri', 'capsa', 'caput', 'caque', 'carap', 'carat', 'carby', 'carbo', 'cardo', 'cards', 'cared', 'carey', 'carer', 'cares', 'caret', 'carex', 'carga', 'cargo', 'carya', 'carib', 'carid', 'caryl', 'carks', 'carle', 'carli', 'carlo', 'carls', 'carne', 'carny', 'carns', 'caroa', 'carob', 'carol', 'carom', 'carot', 'carpe', 'carpi', 'carps', 'carri', 'carry', 'carrs', 'carse', 'carte', 'carty', 'carts', 'carua', 'carum', 'carus', 'carvy', 'casal', 'casas', 'casco', 'cased', 'casey', 'casel', 'caser', 'cases', 'casha', 'casky', 'casks', 'casse', 'cassy', 'caste', 'casts', 'casus', 'catan', 'catch', 'catel', 'cates', 'catha', 'cathy', 'catso', 'catti', 'catty', 'catur', 'cauch', 'cauda', 'cauld', 'cauli', 'caulk', 'cauls', 'cauma', 'caupo', 'causa', 'cause', 'cavae', 'caval', 'cavea', 'caved', 'cavey', 'cavel', 'caver', 'caves', 'cavia', 'cavie', 'cavil', 'cavin', 'cavum', 'cavus', 'cawed', 'cawky', 'cawny', 'caxon', 'ccitt', 'ccoya', 'cease', 'cebid', 'cebil', 'cebur', 'cebus', 'cecal', 'cecca', 'cecil', 'cecum', 'cedar', 'ceded', 'ceder', 'cedes', 'cedis', 'cedre', 'cedry', 'ceiba', 'ceibo', 'ceile', 'ceils', 'ceint', 'celeb', 'celia', 'cella', 'celli', 'cello', 'cells', 'celom', 'celts', 'cense', 'centi', 'cento', 'cents', 'ceorl', 'cepes', 'cequi', 'ceral', 'ceras', 'cerat', 'cerci', 'cered', 'cerer', 'ceres', 'ceria', 'ceric', 'ceryl', 'cerin', 'ceros', 'certy', 'cesar', 'cesta', 'ceste', 'cesti', 'cetes', 'cetic', 'cetid', 'cetyl', 'cetin', 'cetus', 'chace', 'chack', 'chaco', 'chads', 'chafe', 'chaff', 'chaft', 'chaga', 'chaya', 'chain', 'chair', 'chais', 'chays', 'chait', 'chaja', 'chaka', 'chalk', 'chama', 'chamm', 'champ', 'chams', 'chane', 'chang', 'chank', 'chant', 'chaos', 'chape', 'chaps', 'chapt', 'chara', 'chare', 'chary', 'chark', 'charm', 'charr', 'chars', 'chart', 'chase', 'chasm', 'chass', 'chati', 'chats', 'chaui', 'chauk', 'chaum', 'chaus', 'chave', 'chawk', 'chawl', 'chawn', 'chaws', 'chazy', 'cheap', 'cheat', 'check', 'cheek', 'cheep', 'cheer', 'cheet', 'chefs', 'chego', 'cheir', 'cheka', 'cheke', 'cheki', 'chela', 'chelp', 'chena', 'cheng', 'chera', 'chere', 'chert', 'chese', 'chess', 'chest', 'cheth', 'cheve', 'chevy', 'chews', 'chyak', 'chiam', 'chian', 'chiao', 'chias', 'chiba', 'chica', 'chich', 'chick', 'chico', 'chics', 'chide', 'chief', 'chiel', 'chien', 'child', 'chile', 'chyle', 'chill', 'chimb', 'chime', 'chyme', 'chimp', 'chimu', 'china', 'chine', 'ching', 'chink', 'chino', 'chins', 'chint', 'chiot', 'chirk', 'chirl', 'chirm', 'chiro', 'chirp', 'chirr', 'chirt', 'chiru', 'chita', 'chits', 'chivy', 'chivw', 'chizz', 'chloe', 'chlor', 'choak', 'choca', 'chock', 'choco', 'choel', 'choes', 'choga', 'choya', 'choil', 'choir', 'choke', 'choky', 'choko', 'chola', 'chold', 'choli', 'cholo', 'chomp', 'chonk', 'chook', 'choom', 'choop', 'chopa', 'chops', 'chora', 'chord', 'chore', 'chort', 'chose', 'chott', 'choup', 'chous', 'chout', 'choux', 'chowk', 'chows', 'chria', 'chris', 'chron', 'chubb', 'chubs', 'chuck', 'chude', 'chuet', 'chufa', 'chuff', 'chugs', 'chuje', 'chump', 'chums', 'chung', 'chunk', 'churl', 'churm', 'churn', 'churr', 'chuse', 'chute', 'chwas', 'cyano', 'cyans', 'cyath', 'cibol', 'cicad', 'cycad', 'cycas', 'cicer', 'cycle', 'cyclo', 'cyder', 'cydon', 'cigar', 'cigua', 'cilia', 'cylix', 'cymae', 'cymar', 'cymas', 'cymba', 'cymes', 'cimex', 'cymol', 'cymry', 'cinch', 'cinct', 'cindy', 'cinel', 'cines', 'cynic', 'cions', 'cippi', 'cypre', 'circa', 'circe', 'circs', 'cires', 'cyril', 'cirri', 'cyrus', 'cisco', 'cissy', 'cista', 'cists', 'cysts', 'cital', 'cited', 'citee', 'citer', 'cites', 'cytol', 'cyton', 'citua', 'civet', 'civic', 'civie', 'civil', 'civvy', 'cizar', 'clach', 'clack', 'clade', 'clads', 'claes', 'clags', 'claye', 'claik', 'claim', 'clair', 'clays', 'clake', 'clamb', 'clame', 'clamp', 'clang', 'clank', 'clans', 'clape', 'claps', 'clapt', 'clara', 'clare', 'clary', 'clark', 'claro', 'clart', 'clash', 'clasp', 'class', 'clast', 'claus', 'claut', 'clava', 'clave', 'clavi', 'clavy', 'clawk', 'claws', 'clead', 'cleam', 'clean', 'clear', 'cleat', 'cleck', 'cleek', 'clefs', 'cleft', 'clepe', 'clept', 'clerk', 'cleuk', 'cleve', 'clews', 'clich', 'click', 'clyde', 'clyer', 'cliff', 'clift', 'clima', 'climb', 'clime', 'cline', 'cling', 'clink', 'clint', 'clype', 'clips', 'clipt', 'clite', 'clive', 'cloak', 'cloam', 'clock', 'clods', 'cloes', 'cloff', 'clogs', 'cloys', 'cloit', 'cloke', 'cloky', 'clomb', 'clomp', 'clone', 'clong', 'clonk', 'clons', 'cloof', 'cloop', 'cloot', 'clops', 'close', 'closh', 'clote', 'cloth', 'clots', 'cloud', 'clour', 'clout', 'clove', 'clown', 'cloze', 'clubs', 'cluck', 'clued', 'clues', 'cluff', 'clump', 'clung', 'clunk', 'cnida', 'coach', 'coact', 'coaid', 'coala', 'coaly', 'coals', 'coapt', 'coarb', 'coart', 'coast', 'coati', 'coats', 'coaxy', 'cobby', 'cobbs', 'cobia', 'coble', 'cobol', 'cobra', 'cobus', 'cocao', 'cocas', 'cocci', 'cocco', 'cocin', 'cocky', 'cocks', 'cocle', 'cocos', 'cocus', 'codal', 'codas', 'coddy', 'codec', 'coded', 'coden', 'coder', 'codes', 'codex', 'codol', 'codon', 'coeds', 'coeff', 'coeno', 'coffs', 'cogie', 'cogit', 'cogon', 'cogue', 'cohen', 'cohob', 'cohog', 'cohol', 'cohos', 'cohow', 'cohue', 'coyan', 'coyed', 'coyer', 'coifs', 'coign', 'coyly', 'coils', 'coing', 'coiny', 'coins', 'coyol', 'coyos', 'coypu', 'coirs', 'coked', 'cokey', 'coker', 'cokes', 'cokie', 'colan', 'colas', 'colat', 'colds', 'coley', 'colen', 'coles', 'colet', 'colic', 'colin', 'colla', 'colly', 'colob', 'colog', 'colon', 'color', 'colts', 'colza', 'comae', 'comal', 'coman', 'comas', 'combe', 'comby', 'combo', 'combs', 'comdg', 'comdr', 'comdt', 'comer', 'comes', 'comet', 'comfy', 'comic', 'comid', 'comma', 'comme', 'commy', 'commo', 'comox', 'compd', 'compo', 'comps', 'compt', 'comte', 'comus', 'conal', 'conch', 'concn', 'condo', 'coned', 'coney', 'coner', 'cones', 'confr', 'conga', 'conge', 'congo', 'conia', 'conic', 'conin', 'conky', 'conks', 'conli', 'conny', 'conns', 'connu', 'conoy', 'conor', 'consy', 'const', 'contd', 'conte', 'contg', 'conto', 'contr', 'conus', 'cooba', 'cooch', 'cooed', 'cooee', 'cooey', 'cooer', 'coofs', 'cooja', 'cooky', 'cooks', 'cooly', 'cools', 'coomb', 'coomy', 'coony', 'coons', 'coops', 'coopt', 'coorg', 'coost', 'cooth', 'cooty', 'coots', 'copal', 'coped', 'copei', 'copen', 'coper', 'copes', 'copia', 'copis', 'coppa', 'coppy', 'copps', 'copra', 'copse', 'copsy', 'copus', 'coque', 'corah', 'coral', 'coram', 'coran', 'corbe', 'corby', 'cordy', 'cords', 'cored', 'coree', 'corey', 'corer', 'cores', 'corge', 'corgi', 'coria', 'coryl', 'corin', 'corke', 'corky', 'corks', 'corms', 'corno', 'corns', 'cornu', 'coroa', 'corol', 'corpl', 'corpn', 'corps', 'corse', 'corsy', 'corso', 'corta', 'corve', 'corvo', 'cosec', 'cosed', 'cosey', 'cosen', 'coses', 'coset', 'cosie', 'cosin', 'cosmo', 'cosse', 'costa', 'costs', 'cotan', 'cotch', 'coted', 'cotes', 'cothe', 'cothy', 'cotys', 'cotta', 'cotte', 'cotty', 'couac', 'couch', 'coude', 'cough', 'could', 'couma', 'count', 'coupe', 'coups', 'courb', 'cours', 'court', 'couth', 'couve', 'coved', 'covey', 'coven', 'cover', 'coves', 'covet', 'covid', 'covin', 'cowal', 'cowan', 'cowed', 'cower', 'cowle', 'cowls', 'cowry', 'coxae', 'coxal', 'coxed', 'coxes', 'cozed', 'cozey', 'cozen', 'cozes', 'cozie', 'craal', 'crack', 'craft', 'crags', 'craie', 'craye', 'craig', 'craik', 'crain', 'crake', 'cramp', 'crams', 'crane', 'crang', 'crany', 'crank', 'crape', 'crapy', 'craps', 'crare', 'crash', 'crass', 'crate', 'crave', 'cravo', 'crawl', 'crawm', 'craws', 'craze', 'crazy', 'crcao', 'crche', 'cread', 'creak', 'creat', 'creda', 'credo', 'creed', 'creek', 'creel', 'creem', 'creen', 'creep', 'crees', 'crena', 'crepy', 'crept', 'cresc', 'cress', 'crest', 'creta', 'crete', 'crewe', 'crews', 'cryal', 'cribo', 'cribs', 'crick', 'cried', 'criey', 'crier', 'cries', 'crile', 'crime', 'crimp', 'crine', 'crink', 'crips', 'crypt', 'criss', 'cryst', 'crith', 'croak', 'croat', 'croci', 'crock', 'croft', 'croyl', 'crois', 'crome', 'crone', 'crony', 'cronk', 'crood', 'crook', 'crool', 'croon', 'crops', 'crore', 'crosa', 'crose', 'cross', 'crost', 'croup', 'crout', 'crowd', 'crowl', 'crown', 'crows', 'croze', 'cruce', 'cruck', 'crude', 'crudy', 'cruds', 'cruel', 'cruet', 'crull', 'crump', 'crunk', 'crunt', 'cruor', 'crura', 'cruse', 'crush', 'cruth', 'crwth', 'csect', 'csnet', 'ctene', 'ctimo', 'cuban', 'cubas', 'cubby', 'cubeb', 'cubed', 'cuber', 'cubes', 'cubic', 'cubit', 'cubla', 'cubti', 'cucuy', 'cuddy', 'cueca', 'cueva', 'cuffy', 'cuffs', 'cufic', 'cuyas', 'cuifs', 'cuing', 'cuish', 'cujam', 'cukes', 'culch', 'culet', 'culex', 'culla', 'cully', 'culls', 'culmy', 'culms', 'culot', 'culpa', 'culti', 'cults', 'cumay', 'cumal', 'cumar', 'cumbu', 'cumic', 'cumyl', 'cumly', 'cumol', 'cunan', 'cunas', 'cundy', 'cunea', 'cunei', 'cunye', 'cunit', 'cunni', 'cunny', 'cunts', 'cunza', 'cupay', 'cupel', 'cupid', 'cuppa', 'cuppy', 'curat', 'curby', 'curbs', 'curch', 'curdy', 'cured', 'curer', 'cures', 'curet', 'curfs', 'curia', 'curie', 'curin', 'curio', 'curly', 'curls', 'curns', 'currs', 'cursa', 'curse', 'curst', 'curua', 'curve', 'curvy', 'cusec', 'cushy', 'cusie', 'cusks', 'cusps', 'cusso', 'cutch', 'cutey', 'cuter', 'cutes', 'cutie', 'cutin', 'cutis', 'cutty', 'cutup', 'cuvee', 'czars', 'czech', 'dabba', 'dabby', 'dabih', 'dabuh', 'daces', 'dacha', 'dachs', 'dacus', 'dadap', 'dadas', 'daddy', 'dados', 'daeva', 'daffy', 'daffs', 'dafla', 'dagga', 'daggy', 'dagon', 'dagos', 'dahms', 'dayak', 'dayal', 'dayan', 'daijo', 'daily', 'daint', 'daira', 'dairi', 'dairt', 'daisy', 'daiva', 'daker', 'dakir', 'dalai', 'dalan', 'dalar', 'dalea', 'daler', 'dales', 'dalis', 'dalle', 'dally', 'daman', 'damar', 'damas', 'dames', 'damia', 'damie', 'damme', 'damns', 'damon', 'dampy', 'damps', 'danae', 'danai', 'dance', 'dancy', 'danda', 'dandy', 'danes', 'dangs', 'danic', 'danio', 'danke', 'danli', 'danny', 'dansy', 'dansk', 'danta', 'dante', 'darac', 'daraf', 'darat', 'darby', 'darbs', 'darci', 'darcy', 'dared', 'daren', 'darer', 'dares', 'dargo', 'darya', 'daric', 'darii', 'daryl', 'darin', 'darky', 'darks', 'darns', 'daroo', 'darst', 'darts', 'dashy', 'dasht', 'dasya', 'dasnt', 'dassy', 'datch', 'dated', 'dater', 'datil', 'datos', 'datsw', 'datto', 'datum', 'daube', 'dauby', 'daubs', 'dauke', 'dault', 'daunt', 'dauri', 'dauts', 'daven', 'daver', 'david', 'davis', 'davit', 'dawdy', 'dawed', 'dawen', 'dawks', 'dawny', 'dawns', 'dawts', 'dawut', 'dazed', 'dazes', 'deady', 'deads', 'deair', 'deals', 'dealt', 'deans', 'deare', 'deary', 'dearn', 'dears', 'deash', 'death', 'deave', 'debag', 'debar', 'debat', 'debby', 'debel', 'deben', 'debye', 'debit', 'debts', 'debug', 'debus', 'debut', 'decad', 'decay', 'decal', 'decan', 'decap', 'decem', 'decil', 'decyl', 'decke', 'decks', 'decoy', 'decor', 'decry', 'decus', 'dedal', 'dedan', 'deddy', 'dedit', 'deedy', 'deeds', 'deems', 'deeny', 'deeps', 'deers', 'deess', 'defat', 'defer', 'defet', 'defis', 'defix', 'defog', 'degas', 'degum', 'deice', 'deify', 'deign', 'deils', 'deink', 'deino', 'deynt', 'deism', 'deist', 'deity', 'deked', 'dekes', 'dekko', 'dekle', 'delay', 'delaw', 'deled', 'deles', 'delfs', 'delft', 'delhi', 'delia', 'delim', 'delis', 'delit', 'della', 'delly', 'dells', 'deloo', 'delph', 'delta', 'delve', 'demal', 'demes', 'demit', 'demob', 'demon', 'demos', 'demot', 'demur', 'denay', 'denar', 'denat', 'denda', 'deneb', 'denes', 'denim', 'denis', 'denom', 'dense', 'denty', 'dents', 'deota', 'depas', 'depel', 'depit', 'depoh', 'depot', 'depth', 'derah', 'deray', 'derat', 'derby', 'derek', 'deric', 'deriv', 'derma', 'derms', 'derog', 'derri', 'derry', 'derth', 'derve', 'desex', 'desyl', 'desks', 'desma', 'dessa', 'desto', 'detar', 'detat', 'detax', 'deter', 'detin', 'dette', 'detur', 'deuce', 'deval', 'devas', 'devel', 'devex', 'devil', 'devon', 'devot', 'devow', 'dewal', 'dewan', 'dewar', 'dewax', 'dewed', 'dewey', 'dewer', 'dexes', 'dhabb', 'dhaks', 'dhava', 'dheri', 'dhyal', 'dhikr', 'dhobi', 'dhoby', 'dhole', 'dhoni', 'dhoon', 'dhoti', 'dhoty', 'dhoul', 'dhows', 'dhuti', 'diact', 'dyads', 'diaka', 'dials', 'diamb', 'diana', 'diane', 'dyaus', 'diazo', 'diced', 'dicey', 'dicer', 'dices', 'dicht', 'dicky', 'dicks', 'dicot', 'dicta', 'dicty', 'didal', 'diddy', 'didie', 'didym', 'didle', 'didna', 'didnt', 'didos', 'didst', 'didus', 'diego', 'diene', 'dieri', 'dyers', 'diety', 'diets', 'difda', 'dight', 'digit', 'digne', 'digor', 'digue', 'dying', 'diked', 'dyked', 'diker', 'dyker', 'dikes', 'dykes', 'dylan', 'dildo', 'dilis', 'dilli', 'dilly', 'dills', 'dilos', 'dimer', 'dimes', 'dimin', 'dimit', 'dimly', 'dimmy', 'dimna', 'dimps', 'dinah', 'dynam', 'dinar', 'dined', 'dynel', 'dines', 'dynes', 'dinge', 'dingy', 'dingo', 'dings', 'dinic', 'dinka', 'dinky', 'dinks', 'dinos', 'dints', 'dinus', 'diode', 'diols', 'dione', 'dioon', 'diose', 'diota', 'dioti', 'dioxy', 'diple', 'dippy', 'dipsy', 'dipso', 'dipus', 'dirca', 'direr', 'direx', 'dirge', 'dirgy', 'dirks', 'dirls', 'dirty', 'dirts', 'disci', 'disco', 'discs', 'dishy', 'disks', 'disli', 'disme', 'disna', 'disty', 'distn', 'distr', 'dital', 'ditas', 'ditch', 'diter', 'dites', 'ditty', 'ditto', 'diurn', 'divan', 'divas', 'dived', 'divel', 'diver', 'dives', 'divet', 'divia', 'divid', 'divot', 'divus', 'divvy', 'diwan', 'dixie', 'dixit', 'dizen', 'dizzy', 'djave', 'djinn', 'djins', 'djuka', 'doand', 'doaty', 'doats', 'dobby', 'dobie', 'dobla', 'dobos', 'dobra', 'docks', 'doddy', 'dodge', 'dodgy', 'dodos', 'doers', 'doesn', 'doest', 'doeth', 'doffs', 'dogal', 'dogey', 'doges', 'doggy', 'doggo', 'dogie', 'dogly', 'dogma', 'dogra', 'doyen', 'doigt', 'doyle', 'doily', 'doyly', 'doylt', 'doina', 'doing', 'doyst', 'doits', 'dojos', 'dolce', 'dolci', 'doled', 'doley', 'doles', 'dolia', 'dolly', 'dolls', 'dolor', 'dolos', 'dolph', 'dolts', 'dolus', 'domal', 'domba', 'domed', 'domer', 'domes', 'domic', 'dompt', 'domus', 'donal', 'donar', 'donas', 'donat', 'donax', 'doncy', 'donec', 'donee', 'doney', 'donet', 'donga', 'dongs', 'donia', 'donis', 'donna', 'donne', 'donny', 'donor', 'donsy', 'donum', 'dooja', 'dooli', 'dooly', 'dooms', 'doors', 'doozy', 'dopas', 'doped', 'dopey', 'doper', 'dopes', 'dorab', 'dorad', 'doray', 'doree', 'dorey', 'doria', 'doric', 'doris', 'dorje', 'dormy', 'dorms', 'dorps', 'dorrs', 'dorsa', 'dorse', 'dorsi', 'dorty', 'dorts', 'dosed', 'doser', 'doses', 'dosis', 'dossy', 'dotal', 'doted', 'doter', 'dotes', 'dotty', 'douar', 'doubt', 'douce', 'dougl', 'douma', 'doura', 'douse', 'dovey', 'doven', 'dover', 'doves', 'dowdy', 'dowed', 'dowel', 'dower', 'dowie', 'dowly', 'downy', 'downs', 'dowry', 'dowse', 'dowve', 'doxie', 'dozed', 'dozen', 'dozer', 'dozes', 'draba', 'drabs', 'draco', 'draff', 'draft', 'drago', 'drags', 'drail', 'drain', 'drays', 'drake', 'drama', 'drame', 'dramm', 'drams', 'drang', 'drank', 'drant', 'drape', 'drate', 'drats', 'drave', 'drawk', 'drawl', 'drawn', 'draws', 'dread', 'dream', 'drear', 'dreck', 'dreed', 'dreep', 'drees', 'dregs', 'dreks', 'dreng', 'drent', 'dress', 'drest', 'dryad', 'drias', 'dryas', 'dribs', 'drier', 'dryer', 'dries', 'drift', 'drily', 'dryly', 'drill', 'drinn', 'drips', 'dript', 'drisk', 'dryth', 'drive', 'drogh', 'droil', 'droyl', 'droit', 'droll', 'drome', 'drona', 'drone', 'drony', 'droob', 'drool', 'droop', 'drops', 'dropt', 'dross', 'droud', 'drouk', 'drove', 'drovy', 'drown', 'drubs', 'drugs', 'druid', 'drums', 'drung', 'drunk', 'drunt', 'drupa', 'drupe', 'drury', 'druse', 'drusy', 'druxy', 'druze', 'dsect', 'dtset', 'duads', 'duala', 'duali', 'duals', 'duane', 'duant', 'dubba', 'dubby', 'dubhe', 'dubio', 'ducal', 'ducat', 'duces', 'duchy', 'ducky', 'ducks', 'ducts', 'duddy', 'dudes', 'duels', 'duets', 'duffy', 'duffs', 'dugal', 'duhat', 'duits', 'dujan', 'dukes', 'dukhn', 'dulat', 'dulce', 'duler', 'dulia', 'dully', 'dulls', 'dulse', 'dumas', 'dumba', 'dumby', 'dumbs', 'dumka', 'dumky', 'dummy', 'dumpy', 'dumps', 'dunal', 'dunce', 'dunch', 'dunes', 'dungy', 'dungs', 'dunks', 'dunne', 'dunny', 'dunno', 'dunst', 'dunts', 'duole', 'duomi', 'duomo', 'duped', 'duper', 'dupes', 'dupla', 'duple', 'duply', 'duppa', 'duppy', 'dural', 'duras', 'durax', 'dured', 'duree', 'dures', 'duret', 'duryl', 'durio', 'durns', 'duroc', 'duroy', 'duros', 'durra', 'durry', 'durrs', 'durst', 'durum', 'durzi', 'dusio', 'dusky', 'dusks', 'dusty', 'dusts', 'dusun', 'dutch', 'dutra', 'duvet', 'duxes', 'dvigu', 'dwale', 'dwalm', 'dwang', 'dwarf', 'dwell', 'dwelt', 'dwyka', 'dwine', 'eably', 'eager', 'eagle', 'eagre', 'eared', 'earle', 'early', 'earls', 'earns', 'earsh', 'earth', 'eased', 'easel', 'easer', 'eases', 'easts', 'eaten', 'eater', 'eaved', 'eaver', 'eaves', 'ebbed', 'ebbet', 'eblis', 'ebony', 'ebons', 'ecart', 'echar', 'echea', 'eched', 'eches', 'echis', 'echos', 'ecize', 'eclat', 'ecoid', 'ecole', 'ecrus', 'ectad', 'ectal', 'edana', 'edder', 'eddic', 'eddie', 'edema', 'edgar', 'edged', 'edger', 'edges', 'edict', 'edify', 'ediya', 'edile', 'edith', 'edits', 'edoni', 'educe', 'educt', 'edwin', 'eeler', 'eemis', 'eerie', 'eeten', 'effet', 'effie', 'egads', 'egall', 'egers', 'egest', 'eggar', 'egged', 'egger', 'egypt', 'egret', 'egrid', 'eyass', 'eider', 'eidos', 'eyers', 'eyess', 'eight', 'eyght', 'eigne', 'eying', 'eikon', 'eimak', 'eimer', 'eyoty', 'eyrar', 'eyras', 'eyren', 'eyrer', 'eyres', 'eyrie', 'eyrir', 'eject', 'ejido', 'ejusd', 'ekaha', 'eking', 'ekron', 'elaic', 'elayl', 'elain', 'elamp', 'eland', 'elans', 'elaps', 'elate', 'elbow', 'elder', 'eldin', 'elean', 'elect', 'elegy', 'eleme', 'elemi', 'eleut', 'eleve', 'elfic', 'elfin', 'elian', 'elias', 'elide', 'elihu', 'elymi', 'eliot', 'elite', 'eliza', 'ellan', 'ellen', 'elmer', 'eloah', 'eloge', 'elogy', 'eloin', 'elong', 'elope', 'elops', 'elric', 'elses', 'elsin', 'elude', 'elute', 'elvan', 'elver', 'elves', 'elvet', 'elvis', 'email', 'emane', 'embay', 'embar', 'embed', 'ember', 'embog', 'embow', 'embox', 'embue', 'embus', 'emcee', 'emden', 'emeer', 'emend', 'emery', 'emesa', 'emeus', 'emyde', 'emyds', 'emigr', 'emily', 'emirs', 'emits', 'emlen', 'emmer', 'emmet', 'emmew', 'emong', 'emony', 'emory', 'emote', 'emove', 'empeo', 'empty', 'emule', 'emuls', 'enact', 'enage', 'enami', 'enapt', 'enarm', 'enate', 'encia', 'encyc', 'encup', 'ended', 'ender', 'endew', 'endia', 'endow', 'endue', 'eneas', 'eneid', 'enema', 'enemy', 'enent', 'enfin', 'engem', 'engin', 'engle', 'enhat', 'eniac', 'enlay', 'enmew', 'ennew', 'ennia', 'ennoy', 'ennui', 'enoch', 'enode', 'enoil', 'enols', 'enorm', 'enorn', 'enows', 'enpia', 'enray', 'enrib', 'enrol', 'enrut', 'ensky', 'ensue', 'entad', 'ental', 'entea', 'enter', 'entia', 'entom', 'entre', 'entry', 'entte', 'enure', 'envoi', 'envoy', 'enweb', 'enzym', 'eoith', 'eosin', 'epact', 'epees', 'epeus', 'ephah', 'ephas', 'ephod', 'ephoi', 'ephor', 'epics', 'epiky', 'epist', 'eplot', 'epoch', 'epode', 'epopt', 'epoxy', 'eppes', 'eppie', 'epris', 'epsom', 'epulo', 'equal', 'eques', 'equid', 'equip', 'equiv', 'equus', 'erade', 'erase', 'erato', 'erava', 'erbia', 'erect', 'erept', 'ergal', 'ergon', 'ergot', 'erian', 'erica', 'erick', 'erika', 'eryon', 'erizo', 'ermit', 'ernes', 'ernie', 'ernst', 'erode', 'erose', 'erred', 'erron', 'error', 'ersar', 'erses', 'eruca', 'eruct', 'erugo', 'erump', 'erupt', 'ervil', 'ervum', 'erwin', 'esbay', 'escar', 'escot', 'escry', 'esere', 'eshin', 'eskar', 'esker', 'espec', 'esrog', 'essay', 'essed', 'essee', 'esses', 'essex', 'essie', 'estab', 'ester', 'estoc', 'estop', 'estre', 'estus', 'etang', 'etape', 'ethal', 'ethan', 'ethel', 'ether', 'ethic', 'ethid', 'ethyl', 'ethos', 'etiam', 'etyma', 'etnas', 'etrog', 'ettle', 'etude', 'etuis', 'etuve', 'etwas', 'etwee', 'eucre', 'eucti', 'euler', 'eupad', 'euros', 'eurus', 'eusol', 'evade', 'evang', 'evans', 'evase', 'eveck', 'evene', 'evens', 'event', 'every', 'evert', 'evese', 'evict', 'evils', 'evite', 'evoke', 'ewder', 'ewery', 'ewers', 'ewest', 'ewhow', 'ewing', 'exact', 'exalt', 'exams', 'exaun', 'excel', 'excud', 'excur', 'exdie', 'exeat', 'execs', 'exect', 'exede', 'exert', 'exhbn', 'exies', 'exile', 'exine', 'exing', 'exion', 'exist', 'exite', 'exits', 'exlex', 'exode', 'exody', 'exopt', 'expdt', 'expel', 'expos', 'exptl', 'expwy', 'exsec', 'exter', 'extol', 'extra', 'exude', 'exult', 'exurb', 'exust', 'exxon', 'faade', 'fabes', 'fable', 'faced', 'facer', 'faces', 'facet', 'facia', 'facie', 'facit', 'facks', 'facty', 'facto', 'facts', 'faddy', 'faded', 'faden', 'fader', 'fades', 'fadge', 'fadme', 'fados', 'faena', 'faery', 'faffy', 'fager', 'faggy', 'fagin', 'fagot', 'fagus', 'faham', 'fayal', 'fayed', 'fails', 'fains', 'faint', 'faire', 'fairy', 'fairm', 'fairs', 'faith', 'faits', 'faked', 'faker', 'fakes', 'fakir', 'falco', 'falda', 'falla', 'fally', 'falls', 'false', 'falun', 'falus', 'famed', 'fames', 'fanal', 'fanam', 'fancy', 'fanes', 'fanga', 'fangy', 'fango', 'fangs', 'fanit', 'fanny', 'fanon', 'fanos', 'fanti', 'fanum', 'fanwe', 'faqir', 'farad', 'farce', 'farci', 'farcy', 'farde', 'fardh', 'fardo', 'fards', 'fared', 'farer', 'fares', 'fario', 'farle', 'farls', 'farmy', 'farms', 'faros', 'farse', 'farsi', 'farth', 'farts', 'fasti', 'fasts', 'fatal', 'fated', 'fates', 'fatil', 'fatly', 'fator', 'fatso', 'fatty', 'fatwa', 'faugh', 'fauld', 'fault', 'faulx', 'fauna', 'fauns', 'faurd', 'fause', 'faust', 'faute', 'fauve', 'favel', 'favor', 'favus', 'fawny', 'fawns', 'faxed', 'faxes', 'fazed', 'fazes', 'fchar', 'fcomp', 'fconv', 'fdubs', 'fears', 'fease', 'featy', 'feats', 'feaze', 'fecal', 'feces', 'fecit', 'fecks', 'fedia', 'feedy', 'feeds', 'feely', 'feels', 'feere', 'feest', 'feeze', 'feyer', 'feign', 'feint', 'feist', 'felid', 'felis', 'felix', 'fella', 'felly', 'fells', 'felon', 'felty', 'felts', 'felup', 'femes', 'femic', 'femme', 'fence', 'fendy', 'fends', 'fenks', 'fenny', 'feods', 'feoff', 'ferae', 'feral', 'feres', 'feria', 'ferie', 'ferio', 'ferly', 'ferme', 'fermi', 'ferny', 'ferns', 'ferox', 'ferri', 'ferry', 'ferth', 'fesse', 'festa', 'feste', 'festy', 'fetal', 'fetas', 'fetch', 'feted', 'fetes', 'fetid', 'fetis', 'fetor', 'fetus', 'fetwa', 'feuar', 'feuds', 'feued', 'feute', 'fever', 'fewer', 'fezes', 'fezzy', 'fgrid', 'fhrer', 'fiant', 'fiard', 'fiars', 'fiats', 'fiber', 'fibra', 'fibre', 'fibry', 'fibro', 'fices', 'fyces', 'fiche', 'fichu', 'ficin', 'ficus', 'fidac', 'fidel', 'fides', 'fidge', 'fidia', 'fidos', 'fiefs', 'field', 'fiend', 'fient', 'fieri', 'fiery', 'fifed', 'fifer', 'fifes', 'fifie', 'fifth', 'fifty', 'figgy', 'fight', 'fiked', 'fikey', 'fykes', 'fikie', 'filao', 'filar', 'filch', 'filea', 'filed', 'filer', 'files', 'filii', 'filix', 'filla', 'fille', 'filly', 'fills', 'filmy', 'films', 'filth', 'filum', 'final', 'finca', 'finch', 'findy', 'finds', 'fined', 'finer', 'fines', 'finew', 'fingu', 'finis', 'finks', 'finny', 'finns', 'fiord', 'fique', 'firca', 'fired', 'firer', 'fires', 'firma', 'firms', 'firns', 'firry', 'first', 'firth', 'fiscs', 'fisty', 'fists', 'fitch', 'fitly', 'fytte', 'fitty', 'fiver', 'fives', 'fixed', 'fixer', 'fixes', 'fixup', 'fizzy', 'fjeld', 'fjord', 'flabs', 'flack', 'flaff', 'flags', 'flail', 'flain', 'flair', 'flays', 'flake', 'flaky', 'flamb', 'flame', 'flamy', 'flams', 'flane', 'flang', 'flank', 'flaps', 'flare', 'flary', 'flash', 'flask', 'flats', 'flavo', 'flawy', 'flawn', 'flaws', 'flaxy', 'flche', 'fldxt', 'fleay', 'fleak', 'fleam', 'flear', 'fleas', 'fleck', 'flect', 'fleer', 'flees', 'fleet', 'flegm', 'fleys', 'fleme', 'fleta', 'fleur', 'flews', 'flexo', 'flyby', 'flick', 'flics', 'flied', 'flier', 'flyer', 'flies', 'flimp', 'fling', 'flint', 'flipe', 'flype', 'flips', 'flirt', 'flisk', 'flite', 'flyte', 'flits', 'fload', 'float', 'flock', 'flocs', 'floey', 'floes', 'flogs', 'floyd', 'floit', 'floyt', 'flong', 'flood', 'flook', 'floor', 'flops', 'flora', 'flory', 'flosh', 'floss', 'flota', 'flote', 'flots', 'flout', 'flowe', 'flowk', 'flown', 'flows', 'flrie', 'flubs', 'flued', 'fluey', 'fluer', 'flues', 'fluff', 'fluid', 'fluyt', 'fluke', 'fluky', 'flume', 'flump', 'flung', 'flunk', 'fluor', 'flurn', 'flurr', 'flurt', 'flush', 'flusk', 'flute', 'fluty', 'fname', 'fnese', 'foaly', 'foals', 'foamy', 'foams', 'focal', 'focus', 'fodda', 'foder', 'fodge', 'foehn', 'foeti', 'fogas', 'fogey', 'foggy', 'fogie', 'fogle', 'fogon', 'fogou', 'fogus', 'fohat', 'fohns', 'foyer', 'foils', 'foins', 'foism', 'foist', 'foldy', 'folds', 'folia', 'folic', 'folie', 'folio', 'folky', 'folks', 'folly', 'fomes', 'fonds', 'fondu', 'fonly', 'fonts', 'foody', 'foods', 'fools', 'footy', 'foots', 'foppy', 'foray', 'foram', 'forby', 'forbs', 'force', 'forcy', 'fordy', 'fordo', 'fords', 'forel', 'fores', 'foret', 'forex', 'forge', 'forgo', 'forky', 'forks', 'forma', 'forme', 'formy', 'forms', 'forra', 'forst', 'forte', 'forth', 'forty', 'forts', 'forum', 'fosie', 'fossa', 'fosse', 'fotch', 'fotui', 'fouls', 'found', 'fount', 'fourb', 'fours', 'foute', 'fouth', 'fouty', 'fovea', 'fowls', 'foxed', 'foxer', 'foxes', 'foxie', 'foxly', 'fplot', 'fpsps', 'frack', 'fract', 'frags', 'fraid', 'fraik', 'frail', 'frayn', 'frays', 'frame', 'franc', 'frank', 'franz', 'frape', 'frapp', 'fraps', 'frary', 'frase', 'frass', 'frate', 'frats', 'fraud', 'fraus', 'frawn', 'fraze', 'frden', 'freak', 'fream', 'freck', 'freed', 'freen', 'freer', 'frees', 'freet', 'freya', 'freir', 'freyr', 'freit', 'fremd', 'fremt', 'frena', 'freon', 'frere', 'fress', 'frets', 'frett', 'freud', 'friar', 'frier', 'fryer', 'frigs', 'frija', 'frike', 'frill', 'frise', 'frisk', 'friss', 'frist', 'frith', 'frits', 'fritt', 'fritz', 'frize', 'frizz', 'frock', 'froes', 'frogs', 'frond', 'frons', 'front', 'froom', 'frore', 'frory', 'frosh', 'frosk', 'frost', 'froth', 'frowy', 'frowl', 'frown', 'frows', 'froze', 'frugs', 'frump', 'frush', 'frust', 'fuage', 'fubby', 'fubsy', 'fuchi', 'fucks', 'fucus', 'fuder', 'fudgy', 'fuels', 'fuffy', 'fugal', 'fuggy', 'fugie', 'fugio', 'fugit', 'fugle', 'fugue', 'fujis', 'fulah', 'fully', 'fulls', 'fulth', 'fultz', 'fulup', 'fulwa', 'fumed', 'fumer', 'fumes', 'fumet', 'fumid', 'fundi', 'funds', 'funge', 'fungo', 'funic', 'funis', 'funje', 'funky', 'funks', 'funli', 'funny', 'fural', 'furan', 'furca', 'furil', 'furyl', 'furls', 'furor', 'furry', 'furud', 'furze', 'furzy', 'fused', 'fusee', 'fusel', 'fuses', 'fusht', 'fusil', 'fussy', 'fusty', 'fusus', 'futwa', 'fuzed', 'fuzee', 'fuzes', 'fuzil', 'fuzzy', 'gabby', 'gable', 'gabon', 'gaddi', 'gader', 'gades', 'gadge', 'gadid', 'gadis', 'gadso', 'gadus', 'gaels', 'gaffe', 'gaffs', 'gaged', 'gagee', 'gager', 'gages', 'gagor', 'gayal', 'gayer', 'gaily', 'gayly', 'gaine', 'gains', 'gaist', 'gaits', 'gaitt', 'gaius', 'gaize', 'galah', 'galas', 'galax', 'galbe', 'galea', 'galee', 'galei', 'galey', 'galen', 'gales', 'galet', 'galga', 'galik', 'galla', 'galli', 'gally', 'galls', 'galop', 'galut', 'galvo', 'gamba', 'gambe', 'gambs', 'gamed', 'gamey', 'gamer', 'games', 'gamic', 'gamin', 'gamma', 'gammy', 'gamps', 'gamut', 'ganam', 'ganch', 'ganda', 'ganef', 'ganev', 'ganga', 'gange', 'gangs', 'ganja', 'ganof', 'gansa', 'gansy', 'ganta', 'ganza', 'gaols', 'gaped', 'gaper', 'gapes', 'gappy', 'garad', 'garau', 'garbo', 'garbs', 'garce', 'garde', 'gardy', 'gareh', 'garle', 'garni', 'garon', 'garoo', 'garse', 'garth', 'garua', 'garum', 'gasan', 'gases', 'gashy', 'gaspy', 'gasps', 'gassy', 'gasts', 'gatch', 'gated', 'gater', 'gates', 'gatha', 'gator', 'gauby', 'gaucy', 'gaudy', 'gauds', 'gauge', 'gauls', 'gault', 'gaumy', 'gaums', 'gaunt', 'gaura', 'gaure', 'gaurs', 'gauss', 'gauze', 'gauzy', 'gavel', 'gavia', 'gavot', 'gawby', 'gawky', 'gawks', 'gawsy', 'gazed', 'gazee', 'gazel', 'gazer', 'gazes', 'gazet', 'gazon', 'gazoz', 'gconv', 'gears', 'gease', 'geast', 'gebur', 'gecko', 'gecks', 'gedds', 'geeks', 'geese', 'geest', 'gehey', 'geyan', 'geira', 'geisa', 'geist', 'gekko', 'gelds', 'gelee', 'gelid', 'gelly', 'gelts', 'gemel', 'gemma', 'gemmy', 'gemot', 'gemse', 'gemul', 'genae', 'genal', 'genep', 'genes', 'genet', 'genic', 'genie', 'genii', 'genin', 'genio', 'genip', 'genys', 'genit', 'genny', 'genoa', 'genom', 'genos', 'genre', 'genro', 'genty', 'gents', 'genua', 'genus', 'geode', 'geoff', 'geoid', 'geoty', 'gerah', 'gerbe', 'gerbo', 'gerim', 'gerip', 'germy', 'germs', 'gesan', 'gesso', 'geste', 'gests', 'getae', 'getah', 'getas', 'getfd', 'getic', 'getid', 'getup', 'geums', 'ghain', 'ghana', 'ghast', 'ghats', 'ghaut', 'ghazi', 'ghbor', 'ghees', 'ghent', 'ghess', 'ghyll', 'ghole', 'ghoom', 'ghost', 'ghoul', 'giant', 'gibbi', 'gibby', 'gibed', 'gybed', 'gibel', 'giber', 'gibes', 'gybes', 'gibli', 'gibus', 'giddy', 'gifts', 'gigas', 'gyges', 'gigge', 'gighe', 'gygis', 'gigot', 'gigue', 'giher', 'gilds', 'giles', 'gilet', 'gilia', 'gilim', 'gilly', 'gills', 'gilpy', 'gilse', 'gilty', 'gilts', 'gimel', 'gymel', 'gimme', 'gimpy', 'gimps', 'ginep', 'gynic', 'ginks', 'ginny', 'ginzo', 'gipon', 'gippy', 'gippo', 'gyppo', 'gipsy', 'gypsy', 'gyral', 'girba', 'girds', 'gyred', 'gyres', 'gyric', 'girja', 'girly', 'girls', 'girny', 'girns', 'giron', 'gyron', 'giros', 'gyros', 'girse', 'girsh', 'girth', 'girts', 'gyrus', 'gisel', 'gisla', 'gismo', 'gists', 'gitim', 'giust', 'gyved', 'givey', 'given', 'giver', 'gives', 'gyves', 'givin', 'gizmo', 'glace', 'glack', 'glade', 'glady', 'glads', 'glaga', 'glaik', 'glair', 'glaky', 'glali', 'gland', 'glans', 'glare', 'glary', 'glass', 'glaum', 'glaur', 'glaux', 'glave', 'glaze', 'glazy', 'glead', 'gleam', 'glean', 'gleba', 'glebe', 'gleby', 'glede', 'gledy', 'gleds', 'gleed', 'gleek', 'gleen', 'glees', 'gleet', 'gleir', 'gleys', 'gleit', 'glene', 'glenn', 'glens', 'glent', 'glial', 'glick', 'glide', 'gliff', 'glike', 'glime', 'glims', 'glink', 'glynn', 'glint', 'glyph', 'glisk', 'gliss', 'glist', 'gloam', 'gloat', 'globe', 'globy', 'globs', 'gloea', 'glogg', 'glome', 'glomi', 'gloms', 'glood', 'gloom', 'glops', 'glore', 'glory', 'gloss', 'glost', 'glout', 'glove', 'glows', 'gloze', 'gluck', 'glued', 'gluey', 'gluer', 'glues', 'gluma', 'glume', 'glump', 'gluon', 'gluts', 'gnarl', 'gnarr', 'gnars', 'gnash', 'gnast', 'gnats', 'gnawn', 'gnaws', 'gnide', 'gnoff', 'gnome', 'goads', 'goala', 'goals', 'goaty', 'goats', 'goave', 'goban', 'gobbe', 'gobby', 'gobet', 'gobia', 'gobio', 'gobos', 'godet', 'godly', 'goers', 'goety', 'gofer', 'gogga', 'gogos', 'goyim', 'goyin', 'goyle', 'going', 'goldi', 'goldy', 'golds', 'golee', 'golem', 'goles', 'golet', 'golfs', 'golgi', 'golly', 'goloe', 'golpe', 'gombo', 'gomer', 'gonad', 'gonal', 'gondi', 'goney', 'goner', 'gongs', 'gonia', 'gonid', 'gonif', 'gonys', 'gonna', 'gonne', 'gonof', 'gonzo', 'goody', 'goods', 'gooey', 'goofy', 'goofs', 'gooky', 'gooks', 'gools', 'gooma', 'goony', 'goons', 'goopy', 'goops', 'goose', 'goosy', 'gopak', 'goral', 'goran', 'gorce', 'gored', 'gorer', 'gores', 'gorge', 'goric', 'gorki', 'gorra', 'gorry', 'gorse', 'gorsy', 'gorst', 'gossy', 'gotch', 'goter', 'gotha', 'goths', 'gotos', 'gotra', 'gotta', 'gouda', 'goudy', 'gouge', 'goumi', 'goura', 'goury', 'gouty', 'gouts', 'gowan', 'gowdy', 'gowds', 'gowks', 'gowns', 'goxes', 'graal', 'grabs', 'grace', 'gracy', 'grade', 'grads', 'graff', 'graft', 'grail', 'graip', 'grays', 'grama', 'grame', 'gramy', 'gramp', 'grams', 'grana', 'grand', 'grane', 'grank', 'grano', 'grant', 'graph', 'grapy', 'grasp', 'grass', 'grata', 'grave', 'graze', 'great', 'grebe', 'grebo', 'grece', 'greco', 'greed', 'greek', 'green', 'grees', 'greet', 'grege', 'gregg', 'grego', 'grein', 'greys', 'greit', 'grene', 'greta', 'grete', 'grewt', 'grice', 'gride', 'gryde', 'grids', 'grief', 'griff', 'grift', 'grigs', 'grike', 'grime', 'grimy', 'grimm', 'grimp', 'grind', 'grins', 'grint', 'griot', 'gripe', 'grype', 'griph', 'gryph', 'gripy', 'grips', 'gript', 'grise', 'grist', 'grith', 'groan', 'groat', 'groff', 'grogs', 'groin', 'groma', 'grond', 'gront', 'groof', 'groom', 'groop', 'groot', 'groow', 'grope', 'gross', 'grosz', 'grote', 'grots', 'grouf', 'group', 'grout', 'grove', 'grovy', 'growl', 'grown', 'grows', 'grubs', 'gruel', 'grues', 'gruff', 'gruft', 'gruis', 'gruys', 'grume', 'grump', 'grunt', 'grush', 'gruss', 'gteau', 'guaba', 'guaco', 'guaka', 'guama', 'guana', 'guano', 'guans', 'guara', 'guard', 'guary', 'guars', 'guasa', 'guato', 'guaza', 'gubat', 'gubbo', 'gucki', 'gucks', 'gudes', 'gudge', 'gudok', 'guelf', 'guess', 'guest', 'guffy', 'guffs', 'gugal', 'guiac', 'guiba', 'guide', 'guido', 'guids', 'guyed', 'guyer', 'guige', 'guijo', 'guild', 'guile', 'guily', 'guilt', 'guyot', 'guiro', 'guise', 'gujar', 'gulae', 'gular', 'gulas', 'gulch', 'gules', 'gulfy', 'gulfs', 'gulix', 'gully', 'gulls', 'gulph', 'gulpy', 'gulps', 'gumby', 'gumly', 'gumma', 'gunda', 'gundi', 'gundy', 'gunge', 'gunja', 'gunky', 'gunks', 'gunne', 'gunny', 'guppy', 'guran', 'gurdy', 'gurge', 'guric', 'gurle', 'gurly', 'gurry', 'gursh', 'gurts', 'gurus', 'guser', 'gushy', 'gusla', 'gusle', 'gussy', 'gusty', 'gusto', 'gusts', 'gutsy', 'gutta', 'gutte', 'gutti', 'gutty', 'guzul', 'gweed', 'gwely', 'gwine', 'haafs', 'haars', 'habab', 'habbe', 'habet', 'habit', 'hable', 'habub', 'habus', 'hacek', 'hache', 'hacht', 'hacky', 'hacks', 'hadal', 'haddo', 'haded', 'hades', 'hadit', 'hadji', 'hadnt', 'hadst', 'haems', 'haets', 'hafis', 'hafiz', 'hafts', 'hagar', 'haggy', 'hagia', 'hague', 'haick', 'haida', 'haydn', 'hayed', 'hayey', 'hayer', 'hayes', 'haika', 'haikh', 'haiks', 'haiku', 'haily', 'hails', 'haine', 'hayne', 'haire', 'hairy', 'hairs', 'haiti', 'hajes', 'hajib', 'hajis', 'hajji', 'hakam', 'hakea', 'hakes', 'hakim', 'hakka', 'halal', 'halas', 'halch', 'haldu', 'haled', 'haler', 'hales', 'halfa', 'halfy', 'halid', 'halke', 'hallo', 'halls', 'halma', 'halms', 'haloa', 'halos', 'halse', 'halte', 'halts', 'halva', 'halve', 'halwe', 'hamal', 'haman', 'hamel', 'hames', 'hamli', 'hammy', 'hamsa', 'hamus', 'hamza', 'hanap', 'hance', 'hanch', 'handy', 'hands', 'hange', 'hangs', 'hanif', 'hanky', 'hanks', 'hankt', 'hanna', 'hanoi', 'hansa', 'hanse', 'hants', 'haole', 'haoma', 'haori', 'hapax', 'haply', 'happy', 'haram', 'haras', 'harbi', 'hardy', 'hards', 'hared', 'harem', 'hares', 'harim', 'harka', 'harks', 'harle', 'harls', 'harms', 'harns', 'harpa', 'harpy', 'harps', 'harre', 'harry', 'harsh', 'harst', 'harts', 'hasan', 'hashy', 'hasht', 'hasid', 'hasky', 'hasnt', 'hasps', 'hasta', 'haste', 'hasty', 'hatch', 'hated', 'hatel', 'hater', 'hates', 'hathi', 'hatte', 'hatti', 'hatty', 'haugh', 'hauld', 'haulm', 'hauls', 'hault', 'haunt', 'hausa', 'hause', 'haust', 'haute', 'havel', 'haven', 'haver', 'haves', 'havoc', 'hawed', 'hawer', 'hawky', 'hawks', 'hawok', 'hawse', 'hazan', 'hazed', 'hazel', 'hazen', 'hazer', 'hazes', 'hazle', 'hdqrs', 'heady', 'heads', 'heald', 'heals', 'heapy', 'heaps', 'heard', 'hears', 'heart', 'heath', 'heats', 'heave', 'heavy', 'heazy', 'heben', 'hecco', 'hecht', 'hecks', 'hecte', 'heder', 'hedge', 'hedgy', 'heedy', 'heeds', 'heels', 'heeze', 'heezy', 'hefty', 'hefts', 'heiau', 'heidi', 'heigh', 'heygh', 'heild', 'heily', 'heils', 'heirs', 'heist', 'heize', 'helas', 'helco', 'helen', 'helge', 'helio', 'helix', 'helly', 'hello', 'hells', 'helms', 'heloe', 'helot', 'helps', 'helve', 'hemad', 'hemal', 'heman', 'hemen', 'hemes', 'hemic', 'hemin', 'hemol', 'hempy', 'hemps', 'henad', 'hence', 'hendy', 'henen', 'henge', 'henna', 'henny', 'henry', 'hents', 'hepar', 'herat', 'herba', 'herby', 'herds', 'herem', 'heres', 'herls', 'herma', 'hermi', 'hermo', 'herms', 'herne', 'herns', 'heron', 'heros', 'herry', 'herse', 'hertz', 'herve', 'hests', 'heths', 'hetty', 'heuau', 'heuch', 'heugh', 'hevea', 'heved', 'hewed', 'hewel', 'hewer', 'hewgh', 'hexad', 'hexed', 'hexer', 'hexes', 'hexyl', 'hexis', 'hiant', 'hiate', 'hibla', 'hybla', 'hicht', 'hichu', 'hicky', 'hicks', 'hided', 'hidel', 'hider', 'hides', 'hydra', 'hydro', 'hield', 'hiems', 'hyena', 'hienz', 'hiera', 'highs', 'hight', 'higra', 'hying', 'hijra', 'hiked', 'hiker', 'hikes', 'hilar', 'hylas', 'hilch', 'hilda', 'hyleg', 'hylic', 'hilly', 'hillo', 'hills', 'hilsa', 'hilts', 'hilum', 'hilus', 'hymen', 'himne', 'hymns', 'hinau', 'hinch', 'hynde', 'hindi', 'hinds', 'hindu', 'hiney', 'hinge', 'hinny', 'hints', 'hyoid', 'hyped', 'hiper', 'hyper', 'hypes', 'hypha', 'hypho', 'hipmi', 'hypos', 'hippa', 'hippi', 'hippy', 'hippo', 'hiram', 'hyrax', 'hired', 'hiren', 'hirer', 'hires', 'hirse', 'hyrse', 'hirst', 'hyrst', 'hisis', 'hyson', 'hispa', 'hissy', 'hists', 'hitch', 'hithe', 'hived', 'hiver', 'hives', 'hoagy', 'hoard', 'hoary', 'hoars', 'hoast', 'hobby', 'hoboe', 'hobos', 'hocco', 'hocky', 'hocks', 'hocus', 'hodad', 'hoddy', 'hodge', 'hoers', 'hogan', 'hogen', 'hoggy', 'hoggs', 'hogni', 'hoick', 'hoyle', 'hoise', 'hoist', 'hokan', 'hoked', 'hokey', 'hoker', 'hokes', 'hokku', 'hokum', 'holds', 'holed', 'holey', 'holer', 'holes', 'holia', 'holks', 'holla', 'holly', 'hollo', 'holms', 'holts', 'homam', 'homed', 'homey', 'homer', 'homes', 'homme', 'homos', 'honan', 'honda', 'hondo', 'honed', 'honer', 'hones', 'hongs', 'honky', 'honks', 'honor', 'honzo', 'hooch', 'hoody', 'hoods', 'hooey', 'hoofy', 'hoofs', 'hooye', 'hooka', 'hooky', 'hooks', 'hooly', 'hoops', 'hoose', 'hoosh', 'hoots', 'hoove', 'hopak', 'hoped', 'hoper', 'hopes', 'hopis', 'hoppy', 'hoppo', 'horae', 'horah', 'horal', 'horas', 'horde', 'horim', 'horla', 'horme', 'horny', 'horns', 'horol', 'horry', 'horse', 'horsy', 'horst', 'hosea', 'hosed', 'hosel', 'hosen', 'hoses', 'hosta', 'hosts', 'hotch', 'hotel', 'hotly', 'hotta', 'hough', 'hoult', 'hound', 'houri', 'hours', 'house', 'housy', 'houss', 'houve', 'hovel', 'hoven', 'hover', 'howdy', 'howea', 'howel', 'howes', 'howff', 'howfs', 'howks', 'howls', 'howso', 'hsien', 'hsuan', 'huaca', 'huaco', 'huari', 'huave', 'hubba', 'hubby', 'hucho', 'hucks', 'huffy', 'huffs', 'huger', 'huile', 'hulas', 'hulch', 'hulky', 'hulks', 'hullo', 'hulls', 'human', 'humbo', 'humet', 'humic', 'humid', 'humin', 'humit', 'humor', 'humph', 'humpy', 'humps', 'humus', 'hunch', 'hundi', 'hunks', 'hunts', 'hurds', 'hurly', 'hurls', 'huron', 'hurri', 'hurry', 'hurst', 'hurty', 'hurts', 'husho', 'husht', 'husky', 'husks', 'hussy', 'hutch', 'hutia', 'hutre', 'huzza', 'huzzy', 'yabbi', 'yabby', 'yaboo', 'yacal', 'yacca', 'yacht', 'yacks', 'yadim', 'yaffs', 'yager', 'yagis', 'yagua', 'yahan', 'yahoo', 'yaird', 'yajna', 'yakan', 'yakin', 'yakka', 'yakut', 'yalla', 'iambe', 'iambi', 'iambs', 'yamel', 'yamen', 'yameo', 'yampa', 'yamph', 'yamun', 'yanan', 'yangs', 'yanky', 'yanks', 'ianus', 'yaply', 'yapok', 'yapon', 'yappy', 'yaqui', 'yaray', 'yarak', 'yards', 'yarer', 'yarke', 'yarly', 'yarns', 'yarry', 'yarth', 'yasht', 'yasna', 'yauds', 'yauld', 'yaups', 'yawed', 'yawey', 'yawls', 'yawny', 'yawns', 'yawps', 'yazoo', 'iberi', 'ibota', 'icaco', 'icasm', 'iceni', 'ichor', 'ichth', 'icica', 'icier', 'icily', 'icker', 'ickle', 'yclad', 'icons', 'iconv', 'ictic', 'ictus', 'idaho', 'idaic', 'idant', 'idcue', 'iddat', 'iddhi', 'iddio', 'ideal', 'idean', 'ideas', 'ident', 'idest', 'ideta', 'idgah', 'idyll', 'idyls', 'idiom', 'idion', 'idiot', 'idism', 'idist', 'idite', 'idled', 'idler', 'idles', 'idola', 'idols', 'idose', 'idryl', 'yeans', 'yeara', 'yeard', 'yearn', 'years', 'yecch', 'yechy', 'yechs', 'yeech', 'yeggs', 'yelek', 'yelks', 'yells', 'yelps', 'yemen', 'yenta', 'yente', 'yeply', 'yerba', 'yerga', 'yerks', 'ierne', 'yerth', 'yerva', 'yeses', 'yesso', 'yesty', 'yetis', 'yetts', 'yeuky', 'yeuks', 'yeven', 'yezdi', 'yezzy', 'yfere', 'ifint', 'ifree', 'ifrit', 'ygapo', 'igara', 'igdyr', 'ighly', 'igloo', 'iglus', 'ignaw', 'ignis', 'ihlat', 'ihram', 'iiasa', 'yield', 'yikes', 'yills', 'yince', 'yinst', 'yipes', 'yirds', 'yirrs', 'yirth', 'ijmaa', 'ijore', 'ikary', 'ikona', 'ikons', 'ilama', 'ileac', 'ileal', 'ylems', 'ileon', 'ileum', 'ileus', 'iliac', 'iliad', 'ilial', 'ilian', 'iliau', 'ilima', 'ilion', 'ilium', 'iller', 'illth', 'illus', 'iloko', 'image', 'imago', 'imams', 'imaum', 'imban', 'imbat', 'imbed', 'imber', 'imbue', 'imcnt', 'imide', 'imido', 'imids', 'imine', 'imino', 'immew', 'immis', 'immit', 'immix', 'immov', 'immun', 'impar', 'imped', 'impel', 'impen', 'imper', 'impis', 'imply', 'impot', 'imput', 'imshi', 'imvia', 'inact', 'inaja', 'inane', 'inapt', 'inark', 'inarm', 'inbye', 'inbow', 'incan', 'incas', 'incle', 'incog', 'incor', 'incra', 'incur', 'incus', 'incut', 'indan', 'indef', 'indew', 'index', 'india', 'indic', 'indii', 'indyl', 'indin', 'indiv', 'indol', 'indow', 'indra', 'indri', 'induc', 'indue', 'indus', 'ineye', 'inept', 'ineri', 'inerm', 'inert', 'infer', 'infin', 'infit', 'infix', 'infos', 'infra', 'ingan', 'ingem', 'inger', 'ingle', 'inglu', 'ingot', 'inial', 'inigo', 'inion', 'injun', 'inked', 'inken', 'inker', 'inket', 'inkie', 'inkle', 'inkos', 'inkra', 'inlay', 'inlaw', 'inlet', 'inmew', 'inned', 'inner', 'innet', 'inoma', 'inone', 'inorb', 'inorg', 'input', 'inrol', 'inrub', 'inrun', 'insea', 'insee', 'insep', 'inset', 'insol', 'instr', 'insue', 'intel', 'inter', 'intil', 'intnl', 'intra', 'intro', 'intsv', 'intue', 'inula', 'inure', 'inurn', 'inust', 'invar', 'invoy', 'inwit', 'yobbo', 'yocco', 'yocks', 'iodal', 'yodel', 'yodhs', 'iodic', 'iodid', 'iodin', 'yodle', 'iodol', 'yogas', 'yogee', 'yoghs', 'yogic', 'yogin', 'yogis', 'yoick', 'yojan', 'yoked', 'yokel', 'yoker', 'yokes', 'yolky', 'yolks', 'yomer', 'yomim', 'yomin', 'yomud', 'ionic', 'yonic', 'yonis', 'yores', 'iortn', 'iotas', 'youff', 'young', 'youre', 'yourn', 'yours', 'yourt', 'youse', 'youth', 'youve', 'youze', 'yoven', 'iowan', 'yowed', 'yowes', 'yowie', 'yowls', 'iphis', 'yquem', 'irade', 'irani', 'iraqi', 'irate', 'irbis', 'irena', 'irene', 'ireos', 'irfan', 'irgun', 'irian', 'irido', 'iring', 'irish', 'irked', 'iroha', 'iroko', 'irone', 'irony', 'irons', 'irous', 'irpex', 'irred', 'irreg', 'irvin', 'irwin', 'isaac', 'isawa', 'isbas', 'iseum', 'isiac', 'ising', 'isize', 'islay', 'islam', 'isled', 'isles', 'islet', 'islot', 'ismal', 'isnad', 'isoln', 'isort', 'issei', 'issue', 'isthm', 'istle', 'itala', 'itali', 'italy', 'itchy', 'itcze', 'itemy', 'items', 'iters', 'ither', 'ytter', 'yuans', 'yucca', 'yucch', 'yuchi', 'yucky', 'yucks', 'yugas', 'yukon', 'yulan', 'yules', 'iulus', 'yuman', 'yunca', 'yupon', 'yurak', 'yurok', 'yurta', 'yurts', 'yuruk', 'ivied', 'ivies', 'ivory', 'ivray', 'ixias', 'ixion', 'ixora', 'ixtle', 'izard', 'izars', 'izing', 'izote', 'iztle', 'izumi', 'izzat', 'jabia', 'jabot', 'jabul', 'jacal', 'jacht', 'jacky', 'jacko', 'jacks', 'jacob', 'jaded', 'jades', 'jagat', 'jager', 'jaggy', 'jaggs', 'jagir', 'jagla', 'jagra', 'jagua', 'jahve', 'jails', 'jaime', 'jaina', 'jakey', 'jakes', 'jakob', 'jakos', 'jakun', 'jalap', 'jalee', 'jalet', 'jalop', 'jalor', 'jalur', 'jaman', 'jambe', 'jambo', 'jambs', 'james', 'jamie', 'jammy', 'janes', 'janet', 'janos', 'janty', 'jantu', 'janua', 'janus', 'japan', 'japed', 'japer', 'japes', 'japyx', 'jarde', 'jared', 'jarls', 'jarmo', 'jarra', 'jarry', 'jarvy', 'jasey', 'jason', 'jaspe', 'jatha', 'jatki', 'jatni', 'jatos', 'jauks', 'jaunt', 'jaups', 'javan', 'javas', 'javel', 'javer', 'jawab', 'jawan', 'jawed', 'jazey', 'jazzy', 'jeany', 'jeans', 'jebat', 'jebel', 'jebus', 'jeeps', 'jeery', 'jeers', 'jefes', 'jehad', 'jehup', 'jehus', 'jelab', 'jelib', 'jells', 'jembe', 'jemez', 'jemmy', 'jenna', 'jenny', 'jerez', 'jerib', 'jerid', 'jerky', 'jerks', 'jerry', 'jesse', 'jests', 'jesus', 'jetes', 'jeton', 'jetty', 'jewed', 'jewel', 'jewis', 'jewry', 'jheel', 'jhool', 'jibba', 'jibby', 'jibbs', 'jibed', 'jiber', 'jibes', 'jiboa', 'jiffy', 'jiffs', 'jiggy', 'jihad', 'jills', 'jilts', 'jimbo', 'jimmy', 'jimpy', 'jingo', 'jingu', 'jinja', 'jinks', 'jinni', 'jinny', 'jinns', 'jiqui', 'jirga', 'jisms', 'jitro', 'jived', 'jives', 'jixie', 'jizya', 'jnana', 'jocko', 'jocks', 'jocum', 'jodel', 'joeys', 'johan', 'johns', 'joyce', 'joyed', 'joins', 'joint', 'joist', 'joked', 'jokey', 'joker', 'jokes', 'jokul', 'joles', 'jolly', 'jolty', 'jolts', 'jomon', 'jonah', 'jonas', 'jones', 'joola', 'joram', 'joree', 'jorge', 'jorum', 'josey', 'joshi', 'josie', 'josip', 'jotas', 'jotty', 'joual', 'jough', 'jougs', 'jouks', 'joule', 'journ', 'jours', 'joust', 'jowar', 'jowed', 'jowel', 'jower', 'jowly', 'jowls', 'jowpy', 'juang', 'juans', 'jubas', 'jubbe', 'jubes', 'jubus', 'judah', 'judas', 'judex', 'judge', 'judos', 'jufti', 'jufts', 'jugal', 'juger', 'jugum', 'juyas', 'juise', 'jujus', 'juked', 'jukes', 'julep', 'jules', 'julia', 'julid', 'julie', 'julio', 'julus', 'jumba', 'jumby', 'jumbo', 'jumma', 'jumpy', 'jumps', 'junco', 'jundy', 'junky', 'junks', 'junta', 'junto', 'jupes', 'jupon', 'jural', 'jurat', 'jurel', 'juris', 'juror', 'jussi', 'justo', 'justs', 'jutes', 'jutic', 'jutka', 'jutty', 'juvia', 'juxta', 'kaaba', 'kaama', 'kabab', 'kabar', 'kabel', 'kabob', 'kacha', 'kadis', 'kadmi', 'kados', 'kafir', 'kafiz', 'kafka', 'kafta', 'kagos', 'kagus', 'kahar', 'kahau', 'kaiak', 'kayak', 'kayan', 'kaifs', 'kails', 'kaimo', 'kains', 'kayos', 'kaiwi', 'kajar', 'kakan', 'kakar', 'kakas', 'kakis', 'kakke', 'kalam', 'kalan', 'kales', 'kalif', 'kalis', 'kalon', 'kalpa', 'kamao', 'kamas', 'kamba', 'kamel', 'kames', 'kamik', 'kamis', 'kanae', 'kanap', 'kanas', 'kanat', 'kande', 'kaneh', 'kanes', 'kanga', 'kanji', 'kannu', 'kansa', 'kanzu', 'kaons', 'kapai', 'kapas', 'kaphs', 'kapok', 'kappa', 'kappe', 'kapur', 'kaput', 'karat', 'karbi', 'karch', 'karel', 'karen', 'karez', 'karma', 'karns', 'karoo', 'karos', 'karou', 'karri', 'karst', 'karts', 'kaser', 'kasha', 'kashi', 'kaska', 'kassu', 'katar', 'katat', 'katha', 'kathy', 'katie', 'katik', 'katun', 'kauch', 'kauri', 'kaury', 'kavas', 'kaver', 'kazak', 'kazoo', 'keach', 'kearn', 'keats', 'keawe', 'kebar', 'kebby', 'kebob', 'kecky', 'kecks', 'kedar', 'kedge', 'kedgy', 'keech', 'keefs', 'keeks', 'keels', 'keena', 'keens', 'keeps', 'keest', 'keets', 'keeve', 'kefir', 'kefti', 'keyed', 'keirs', 'keist', 'keita', 'keith', 'keywd', 'keleh', 'kelek', 'kelep', 'kelia', 'kella', 'kelly', 'kelpy', 'kelps', 'kelty', 'kelts', 'kemal', 'kempy', 'kemps', 'kempt', 'kenaf', 'kenai', 'kench', 'kendy', 'kendo', 'kenya', 'kenny', 'kenno', 'kenos', 'kente', 'keout', 'kepis', 'kerat', 'kerbs', 'kerch', 'kerel', 'keres', 'kerfs', 'keryx', 'kerne', 'kerns', 'keros', 'kerri', 'kerry', 'kerve', 'kesar', 'kesse', 'ketal', 'ketch', 'keten', 'ketyl', 'ketol', 'kette', 'ketty', 'kevan', 'kevel', 'kever', 'kevil', 'kevin', 'kevyn', 'kexes', 'khadi', 'khaya', 'khair', 'khaja', 'khaki', 'khami', 'khans', 'khasa', 'khasi', 'khass', 'khats', 'kheda', 'khila', 'khmer', 'khoja', 'khoka', 'khond', 'khuai', 'khula', 'khuzi', 'khvat', 'kiaat', 'kiack', 'kyack', 'kiaki', 'kiang', 'kyang', 'kyars', 'kyats', 'kibei', 'kibes', 'kibla', 'kicky', 'kicks', 'kiddy', 'kiddo', 'kiefs', 'kieye', 'kiers', 'kiyas', 'kikar', 'kikes', 'kikki', 'kikoi', 'kilah', 'kilan', 'kileh', 'kiley', 'kylie', 'kilij', 'kilim', 'kylin', 'kylix', 'killy', 'kills', 'kilns', 'kyloe', 'kilom', 'kilos', 'kilty', 'kilts', 'kimbo', 'kimmo', 'kinah', 'kinch', 'kinds', 'kines', 'kings', 'kingu', 'kinic', 'kinin', 'kinky', 'kinks', 'kinoo', 'kinos', 'kinot', 'kioea', 'kioko', 'kiosk', 'kyoto', 'kiowa', 'kippy', 'kirby', 'kyrie', 'kirks', 'kirns', 'kirve', 'kisan', 'kishy', 'kisra', 'kissy', 'kists', 'kiswa', 'kitab', 'kitan', 'kitar', 'kited', 'kiter', 'kites', 'kytes', 'kithe', 'kythe', 'kiths', 'kitty', 'kyung', 'kivas', 'kiver', 'kiwai', 'kiwis', 'kizil', 'klans', 'klaus', 'kleig', 'klick', 'klieg', 'kling', 'klino', 'klong', 'kloof', 'klops', 'klosh', 'kluck', 'klunk', 'klutz', 'kmole', 'knack', 'knape', 'knaps', 'knark', 'knarl', 'knars', 'knave', 'knead', 'kneed', 'kneel', 'knees', 'knell', 'knelt', 'knezi', 'kniaz', 'knyaz', 'knick', 'knish', 'knits', 'knive', 'knobs', 'knock', 'knoit', 'knoll', 'knops', 'knorr', 'knosp', 'knots', 'knout', 'knowe', 'known', 'knows', 'knurl', 'knurs', 'knute', 'knuth', 'koala', 'koali', 'koans', 'koban', 'kobus', 'kodak', 'kodro', 'koels', 'koeri', 'kofta', 'kogai', 'kogia', 'kohen', 'kohls', 'kohua', 'koyan', 'koila', 'koine', 'kokam', 'kokan', 'kokia', 'kokil', 'kokio', 'kokos', 'kokra', 'kokum', 'kolas', 'kolea', 'kolis', 'kolos', 'kombu', 'konak', 'konde', 'kondo', 'kongo', 'kongu', 'konia', 'kooka', 'kooky', 'kooks', 'koorg', 'kopec', 'kopek', 'kophs', 'kopis', 'kopje', 'koppa', 'korah', 'korai', 'koran', 'korea', 'korec', 'korin', 'korma', 'koroa', 'korun', 'korwa', 'kosha', 'kosin', 'kosos', 'kotal', 'kotar', 'kotos', 'kotow', 'kouza', 'kovil', 'kraal', 'kraft', 'krait', 'krama', 'krang', 'krans', 'kraut', 'krebs', 'kreil', 'kreis', 'krems', 'kreng', 'krepi', 'krill', 'krina', 'kriss', 'krivu', 'krome', 'krona', 'krone', 'kroon', 'krosa', 'krubi', 'kubba', 'kudos', 'kudus', 'kudzu', 'kufic', 'kugel', 'kukri', 'kukui', 'kulah', 'kulak', 'kulan', 'kuman', 'kumbi', 'kumyk', 'kumis', 'kumys', 'kumni', 'kunai', 'kunbi', 'kurku', 'kurmi', 'kurta', 'kurus', 'kusam', 'kusan', 'kusha', 'kusso', 'kusti', 'kusum', 'kutch', 'kutta', 'kvass', 'kvint', 'kwapa', 'kwela', 'laang', 'laban', 'labba', 'labby', 'label', 'labia', 'labis', 'labor', 'labra', 'lacca', 'laced', 'lacey', 'lacer', 'laces', 'lacet', 'lache', 'lacis', 'lacks', 'lacto', 'laded', 'laden', 'lader', 'lades', 'ladik', 'ladin', 'laeti', 'laevo', 'lagan', 'lagen', 'lagly', 'lagna', 'lahar', 'laich', 'laics', 'layed', 'layer', 'laigh', 'layia', 'laine', 'layne', 'laird', 'lairy', 'lairs', 'laith', 'laity', 'layup', 'laius', 'laked', 'lakey', 'laker', 'lakes', 'lakhs', 'lakie', 'lakin', 'lakke', 'laksa', 'lally', 'lalls', 'lamas', 'lamba', 'lamby', 'lambs', 'lamda', 'lamed', 'lamel', 'lamer', 'lames', 'lamia', 'lamin', 'lammy', 'lamna', 'lampf', 'lamps', 'lamus', 'lamut', 'lanai', 'lanao', 'lanas', 'lanaz', 'lance', 'lanch', 'lande', 'lands', 'laney', 'lanes', 'langi', 'lango', 'lanky', 'lanny', 'lansa', 'lanum', 'lapel', 'lapin', 'lapis', 'lapon', 'lappa', 'lapps', 'lapse', 'lapsi', 'larch', 'lardy', 'lards', 'lares', 'large', 'largy', 'largo', 'laria', 'larid', 'larin', 'larix', 'larky', 'larks', 'laron', 'larry', 'larum', 'larus', 'larva', 'larve', 'lased', 'laser', 'lases', 'lasso', 'lassu', 'lasty', 'lasts', 'latah', 'latax', 'latch', 'lated', 'laten', 'later', 'latex', 'lathe', 'lathi', 'lathy', 'laths', 'latin', 'laton', 'latro', 'latus', 'lauan', 'laude', 'lauds', 'laugh', 'lauia', 'laund', 'laura', 'laure', 'laury', 'lautu', 'lavas', 'laved', 'laver', 'laves', 'lavic', 'lawed', 'lawks', 'lawny', 'lawns', 'lawzy', 'laxer', 'laxly', 'lazar', 'lazed', 'lazes', 'leach', 'leady', 'leads', 'leafy', 'leafs', 'leaky', 'leaks', 'leany', 'leans', 'leant', 'leaps', 'leapt', 'leary', 'learn', 'lears', 'lease', 'leash', 'least', 'leath', 'leave', 'leavy', 'leban', 'leben', 'lebes', 'leche', 'leden', 'ledge', 'ledgy', 'ledol', 'ledum', 'leech', 'leeds', 'leeky', 'leeks', 'leery', 'leers', 'leese', 'leets', 'lefty', 'lefts', 'legal', 'leger', 'leges', 'legge', 'leggy', 'legis', 'legit', 'legoa', 'legua', 'lehay', 'lehrs', 'lehua', 'leigh', 'leila', 'leiss', 'leith', 'lekha', 'lelia', 'leman', 'lemel', 'lemma', 'lemna', 'lemur', 'lenad', 'lenca', 'lench', 'lends', 'lendu', 'lenes', 'lenin', 'lenis', 'lenny', 'lenos', 'lense', 'lenth', 'lento', 'leone', 'leora', 'lepal', 'lepas', 'leper', 'lepid', 'leppy', 'lepra', 'lepre', 'lepry', 'lepta', 'lepus', 'lerot', 'lerwa', 'lesed', 'lesgh', 'lesya', 'lesiy', 'lessn', 'leste', 'letch', 'lethe', 'lethy', 'letty', 'letup', 'leuch', 'leuco', 'leuds', 'leuma', 'leung', 'levee', 'level', 'leven', 'lever', 'levet', 'levin', 'levir', 'levis', 'lewie', 'lewis', 'lewth', 'lewty', 'lexia', 'lexic', 'lexis', 'lhota', 'liana', 'liane', 'liang', 'liard', 'lyard', 'liars', 'lyart', 'lyase', 'libby', 'libel', 'liber', 'libya', 'libra', 'libre', 'libri', 'licca', 'lycea', 'lycee', 'licet', 'lichi', 'licht', 'lycid', 'licit', 'licks', 'lycus', 'lidar', 'lidia', 'lydia', 'lidos', 'liege', 'liens', 'lyery', 'liers', 'liesh', 'liest', 'lieue', 'lieus', 'lieut', 'lieve', 'lifey', 'lifen', 'lifer', 'lifts', 'ligan', 'ligas', 'liger', 'ligge', 'light', 'ligne', 'lygus', 'lying', 'liked', 'liken', 'lyken', 'liker', 'likes', 'likin', 'lilac', 'lilas', 'liles', 'lilly', 'lilts', 'liman', 'limas', 'limax', 'limba', 'limbi', 'limby', 'limbo', 'limbs', 'limbu', 'limed', 'limey', 'limen', 'limer', 'limes', 'limit', 'limli', 'limma', 'limmu', 'limns', 'limos', 'lymph', 'limpy', 'limps', 'limsy', 'linac', 'linch', 'lynch', 'linda', 'lindy', 'lindo', 'linea', 'lined', 'liney', 'linen', 'liner', 'lines', 'linet', 'linga', 'linge', 'lingy', 'lingo', 'lings', 'linha', 'linie', 'linin', 'linja', 'linje', 'linky', 'links', 'linne', 'lynne', 'linns', 'linon', 'linos', 'linty', 'lints', 'linum', 'linus', 'lions', 'lipan', 'lipic', 'lipid', 'lipin', 'lippy', 'lipse', 'liras', 'lyres', 'lyric', 'lyrid', 'lirot', 'lysed', 'lyses', 'lysin', 'lysis', 'lisle', 'lysol', 'lisps', 'lyssa', 'listy', 'lists', 'liszt', 'litai', 'litas', 'litch', 'liter', 'lites', 'lithe', 'lythe', 'lithi', 'lithy', 'litho', 'lytic', 'litra', 'litre', 'lytta', 'litui', 'litus', 'lived', 'liven', 'liver', 'lives', 'livid', 'livor', 'livre', 'liwan', 'llama', 'llano', 'lloyd', 'lludd', 'loach', 'loads', 'loafs', 'loamy', 'loams', 'loans', 'loasa', 'loath', 'loave', 'lobal', 'lobar', 'lobby', 'lobed', 'lobes', 'lobos', 'lobus', 'local', 'loche', 'lochi', 'lochy', 'lochs', 'locky', 'locks', 'locos', 'locum', 'locus', 'loden', 'lodes', 'lodge', 'lodha', 'lodur', 'loeil', 'loess', 'lofty', 'lofts', 'logan', 'loges', 'loggy', 'logia', 'logic', 'logie', 'login', 'logis', 'logoi', 'logos', 'lohan', 'lohar', 'loyal', 'loins', 'lokao', 'loket', 'lolly', 'lolls', 'lomta', 'loner', 'longa', 'longe', 'longs', 'looby', 'looch', 'looed', 'looey', 'loofa', 'loofs', 'looie', 'looky', 'looks', 'looms', 'loony', 'loons', 'loope', 'loopy', 'loops', 'loord', 'loory', 'loose', 'loots', 'loped', 'loper', 'lopes', 'loppy', 'loral', 'loran', 'lordy', 'lords', 'lored', 'lorel', 'loren', 'lores', 'loric', 'loris', 'loros', 'lorry', 'lorum', 'losel', 'loser', 'loses', 'lossy', 'lotah', 'lotan', 'lotas', 'lotic', 'lotor', 'lotos', 'lotta', 'lotte', 'lotto', 'lotus', 'louch', 'louey', 'lough', 'louie', 'louis', 'loulu', 'loupe', 'loups', 'lourd', 'loury', 'lours', 'louse', 'lousy', 'louty', 'louts', 'lovat', 'loved', 'lovee', 'lovey', 'lover', 'loves', 'lowan', 'lowed', 'lower', 'lowes', 'lowly', 'lowry', 'lowse', 'lowth', 'loxed', 'loxes', 'loxia', 'loxic', 'lrecl', 'luaus', 'lubes', 'lubra', 'lucan', 'luces', 'lucet', 'lucia', 'lucid', 'lucky', 'lucks', 'lucre', 'luddy', 'luffa', 'luffs', 'luger', 'luges', 'luian', 'luigi', 'luite', 'lukan', 'lukas', 'luket', 'lulab', 'lulav', 'lully', 'lulls', 'lulus', 'lumen', 'lumme', 'lummy', 'lumpy', 'lumps', 'lumut', 'lunar', 'lunas', 'lunda', 'lunel', 'lunes', 'lunet', 'lunge', 'lungi', 'lungy', 'lungs', 'lunka', 'lunks', 'lunts', 'lupid', 'lupin', 'lupis', 'lupus', 'lural', 'lurch', 'lured', 'lurer', 'lures', 'lurid', 'lurky', 'lurks', 'lurry', 'luser', 'lushy', 'lusky', 'lusty', 'lusts', 'lusus', 'lutao', 'lutea', 'luted', 'luteo', 'luter', 'lutes', 'lutra', 'luxes', 'luxus', 'maana', 'maars', 'mabel', 'macan', 'macao', 'macaw', 'macco', 'maced', 'macer', 'maces', 'machi', 'macho', 'machs', 'macks', 'macle', 'macon', 'macro', 'madam', 'madge', 'madia', 'madid', 'madly', 'madoc', 'madre', 'mafey', 'mafia', 'mafic', 'mafoo', 'magas', 'mages', 'maggy', 'maghi', 'magic', 'magma', 'magna', 'magog', 'magot', 'magus', 'mahal', 'mahar', 'mahat', 'mahdi', 'mahoe', 'mahra', 'mahri', 'mahua', 'mahwa', 'mayan', 'mayas', 'maybe', 'maida', 'mayda', 'maidy', 'maids', 'maidu', 'mayed', 'mayey', 'mayer', 'maiid', 'maile', 'maill', 'mails', 'maims', 'maine', 'mains', 'maint', 'maynt', 'mayor', 'maire', 'mairs', 'maist', 'mayst', 'maius', 'majas', 'major', 'majos', 'makah', 'makar', 'maker', 'makes', 'makos', 'makua', 'makuk', 'malay', 'malam', 'malar', 'malax', 'malee', 'maleo', 'males', 'malgr', 'malic', 'malie', 'malik', 'malls', 'malmy', 'malms', 'malta', 'malty', 'malto', 'malts', 'malum', 'malus', 'malva', 'malwa', 'mamas', 'mamba', 'mambo', 'mambu', 'mamey', 'mamie', 'mamma', 'mammy', 'mamry', 'manak', 'manal', 'manas', 'manba', 'mande', 'mandi', 'mands', 'maned', 'maneh', 'manei', 'maney', 'manes', 'manet', 'manga', 'mange', 'mangi', 'mangy', 'mania', 'manic', 'manid', 'manie', 'manis', 'manit', 'maniu', 'manky', 'manks', 'manly', 'manna', 'manny', 'manoc', 'manor', 'manos', 'manqu', 'manse', 'manso', 'manta', 'manty', 'manto', 'manuf', 'manul', 'manus', 'maori', 'mapau', 'mappy', 'maqui', 'marae', 'marah', 'maray', 'maral', 'maras', 'march', 'marci', 'marco', 'marcs', 'mardi', 'mardy', 'marek', 'mares', 'marga', 'marge', 'maria', 'marid', 'marie', 'mario', 'maris', 'marys', 'marka', 'marko', 'marks', 'marla', 'marli', 'marly', 'marls', 'marok', 'maror', 'maros', 'marry', 'marse', 'marsh', 'marsi', 'marty', 'marts', 'martu', 'marvy', 'masai', 'maser', 'masha', 'mashy', 'masks', 'mason', 'massa', 'masse', 'massy', 'masty', 'masts', 'matai', 'matar', 'matax', 'match', 'mated', 'matey', 'mater', 'mates', 'matha', 'mathe', 'maths', 'matie', 'matin', 'matka', 'matlo', 'matra', 'matsu', 'matta', 'matte', 'matti', 'matty', 'matts', 'matza', 'matzo', 'mauby', 'maugh', 'mauls', 'maund', 'mauri', 'mauts', 'mauve', 'maven', 'mavie', 'mavin', 'mavis', 'mawed', 'mawky', 'mawks', 'maxim', 'maxis', 'mazda', 'mazed', 'mazel', 'mazer', 'mazes', 'mazic', 'mazur', 'mazut', 'mbaya', 'mbira', 'mbori', 'mbuba', 'mccoy', 'mckay', 'meach', 'meads', 'mealy', 'meals', 'meany', 'means', 'meant', 'mease', 'meath', 'meaty', 'meats', 'meaul', 'mebos', 'mecca', 'mecon', 'mecum', 'medal', 'medea', 'media', 'medic', 'medii', 'medio', 'medle', 'medoc', 'meece', 'meech', 'meeds', 'meeks', 'meese', 'meeth', 'meets', 'meggy', 'meiji', 'meile', 'meiny', 'meith', 'melam', 'melas', 'melba', 'melch', 'melds', 'melee', 'meles', 'melia', 'melic', 'melis', 'mells', 'meloe', 'melos', 'melts', 'memos', 'menad', 'menat', 'mende', 'mendi', 'mendy', 'mends', 'menic', 'menow', 'mensa', 'mense', 'mensk', 'menta', 'menus', 'meows', 'merak', 'merat', 'merce', 'merch', 'merci', 'mercy', 'mered', 'merel', 'merer', 'meres', 'merge', 'mergh', 'meril', 'merit', 'merks', 'merle', 'merls', 'merop', 'meros', 'merry', 'merse', 'mesad', 'mesal', 'mesas', 'mesel', 'mesem', 'meshy', 'mesic', 'mesne', 'meson', 'messe', 'messy', 'mesua', 'metad', 'metae', 'metal', 'metas', 'meted', 'metel', 'meter', 'metes', 'metho', 'meths', 'metic', 'metif', 'metin', 'metis', 'metol', 'metra', 'metre', 'metro', 'metus', 'metze', 'meuni', 'meuse', 'meute', 'mewed', 'mewer', 'mewls', 'mezzo', 'mhorr', 'myall', 'miami', 'miaou', 'miaow', 'miasm', 'miaul', 'miauw', 'micah', 'micas', 'miche', 'micht', 'micky', 'micks', 'mycol', 'micra', 'micro', 'midas', 'middy', 'mider', 'midge', 'midgy', 'midis', 'midst', 'miens', 'miffy', 'miffs', 'miggs', 'might', 'miked', 'mikey', 'mikes', 'mikie', 'mikir', 'mikra', 'milan', 'mylar', 'milch', 'miler', 'miles', 'milha', 'milia', 'milit', 'milky', 'milko', 'milks', 'milla', 'mille', 'milly', 'mills', 'milor', 'milos', 'milpa', 'milty', 'milts', 'mymar', 'mimed', 'mimeo', 'mimer', 'mimes', 'mimic', 'mimir', 'mimly', 'mimsy', 'mimus', 'mimzy', 'minae', 'minah', 'mynah', 'minar', 'minas', 'mynas', 'minbu', 'mincy', 'minds', 'mined', 'miner', 'mines', 'minge', 'mingy', 'mingo', 'minie', 'minim', 'minis', 'minks', 'minny', 'minor', 'minos', 'minot', 'minow', 'minum', 'minus', 'myoid', 'myoma', 'myope', 'myopy', 'myops', 'miqra', 'mirac', 'mirak', 'mired', 'mires', 'mirex', 'mirid', 'mirky', 'mirks', 'mirly', 'myron', 'myrrh', 'mirth', 'mirvs', 'mirza', 'misce', 'misdo', 'mysel', 'miser', 'mises', 'misgo', 'mysid', 'mysis', 'misky', 'misly', 'misos', 'missa', 'missy', 'misty', 'mists', 'mitch', 'miter', 'mites', 'myths', 'mitis', 'mitra', 'mitre', 'mitty', 'mitts', 'mitua', 'mixed', 'mixen', 'mixer', 'mixes', 'mixup', 'mizar', 'mizen', 'mizzy', 'mnage', 'mneme', 'mnium', 'moans', 'moats', 'mobby', 'mobed', 'mobil', 'moble', 'moche', 'mochy', 'mocks', 'mocoa', 'modal', 'model', 'modem', 'moder', 'modes', 'modge', 'modif', 'modoc', 'modus', 'moeck', 'moggy', 'mogos', 'mogul', 'mohar', 'mohel', 'mohos', 'mohur', 'mohwa', 'moyen', 'moier', 'moile', 'moyle', 'moils', 'moira', 'moire', 'moise', 'moism', 'moist', 'moity', 'mojos', 'mokes', 'mokum', 'molal', 'molar', 'molas', 'moldy', 'molds', 'moler', 'moles', 'molet', 'molge', 'molka', 'molla', 'molle', 'molly', 'molls', 'molpe', 'molto', 'molts', 'molvi', 'momes', 'momma', 'momme', 'mommy', 'momus', 'monad', 'monal', 'monas', 'monax', 'monde', 'mondo', 'money', 'monel', 'moner', 'mongo', 'monic', 'monie', 'monks', 'monny', 'monos', 'monte', 'month', 'monty', 'montu', 'mooch', 'moody', 'moods', 'mooed', 'moola', 'mools', 'moong', 'moony', 'moons', 'moore', 'moory', 'moorn', 'moors', 'moosa', 'moose', 'moost', 'mooth', 'moots', 'mopan', 'moped', 'mopey', 'moper', 'mopes', 'mopla', 'moppy', 'mopsy', 'mopus', 'moqui', 'morae', 'moray', 'moral', 'moran', 'moras', 'morat', 'mordu', 'mordv', 'mores', 'morga', 'moric', 'morin', 'mormo', 'morne', 'morns', 'moroc', 'moron', 'moror', 'morph', 'morra', 'morro', 'morse', 'morth', 'morts', 'morus', 'mosan', 'mosey', 'mosel', 'moses', 'mosgu', 'mosks', 'mossi', 'mossy', 'mosso', 'moste', 'mosts', 'mosul', 'mosur', 'moted', 'motey', 'motel', 'moter', 'motes', 'motet', 'mothy', 'moths', 'motif', 'moton', 'motor', 'motte', 'motty', 'motto', 'motts', 'mouch', 'moudy', 'moues', 'mould', 'moule', 'mouly', 'mouls', 'moult', 'mound', 'mount', 'mourn', 'mouse', 'mousy', 'mouth', 'moved', 'mover', 'moves', 'movie', 'mowch', 'mowed', 'mower', 'mowha', 'mowie', 'mowra', 'mowse', 'mowth', 'moxas', 'moxie', 'mozos', 'mphps', 'mpret', 'msink', 'mster', 'mtier', 'muang', 'mucic', 'mucid', 'mucin', 'mucky', 'mucks', 'mucor', 'mucro', 'mucus', 'mudar', 'mudde', 'muddy', 'mudee', 'mudir', 'mudra', 'muffy', 'muffs', 'mufti', 'mufty', 'muggy', 'muggs', 'mugho', 'mugil', 'muhly', 'muist', 'mujik', 'mukri', 'mukti', 'mulch', 'mulct', 'muled', 'muley', 'mules', 'mulet', 'mulga', 'mulla', 'mulls', 'mulse', 'multi', 'multo', 'mumbo', 'mummy', 'mumms', 'mumps', 'mumsy', 'munch', 'munda', 'munga', 'munge', 'mungy', 'mungo', 'munia', 'munic', 'muntz', 'muong', 'muons', 'mural', 'muran', 'muras', 'murat', 'mured', 'mures', 'murex', 'murga', 'murid', 'murky', 'murks', 'murly', 'murmi', 'murph', 'murra', 'murre', 'murry', 'murrs', 'murut', 'murva', 'murza', 'musal', 'musar', 'musca', 'musci', 'mused', 'muser', 'muses', 'muset', 'musgu', 'musha', 'mushy', 'music', 'musie', 'musit', 'musky', 'musks', 'mussy', 'musth', 'musty', 'musts', 'mutch', 'muted', 'muter', 'mutes', 'mutic', 'mutts', 'mutus', 'muzzy', 'nabak', 'nabal', 'nabby', 'nabis', 'nabla', 'nable', 'nabob', 'nache', 'nacre', 'nacry', 'nadir', 'naevi', 'nagel', 'naggy', 'naght', 'nagor', 'nahor', 'nahua', 'nahum', 'naiad', 'nayar', 'naias', 'naifs', 'naily', 'nails', 'naira', 'nairy', 'naish', 'naive', 'naked', 'naker', 'nakir', 'nakoo', 'naled', 'namaz', 'nambe', 'namby', 'namda', 'named', 'namer', 'names', 'namma', 'nammo', 'nanas', 'nance', 'nancy', 'nanda', 'nandi', 'nandu', 'nanes', 'nanga', 'nanmu', 'nanny', 'nants', 'nantz', 'naomi', 'naoto', 'napal', 'napes', 'napoo', 'nappa', 'nappe', 'nappy', 'narco', 'narcs', 'nards', 'nardu', 'naren', 'nares', 'naric', 'naris', 'narky', 'narks', 'narra', 'nasab', 'nasal', 'nasat', 'nasch', 'nassa', 'nasty', 'nasua', 'nasus', 'natal', 'natch', 'nates', 'nathe', 'natty', 'natus', 'nauch', 'naumk', 'naunt', 'naval', 'navar', 'navel', 'naves', 'navet', 'navew', 'navig', 'navis', 'navvy', 'nawab', 'nawle', 'nawob', 'nazim', 'nazir', 'nazis', 'neaps', 'nears', 'neath', 'neats', 'nebby', 'nebel', 'necia', 'necks', 'necro', 'neddy', 'needy', 'needn', 'needs', 'neela', 'neeld', 'neele', 'neems', 'neeps', 'neese', 'neeze', 'nefas', 'neffy', 'neger', 'negro', 'negus', 'nehru', 'neifs', 'neigh', 'neist', 'nejdi', 'nelly', 'nemas', 'nemos', 'nenes', 'nenta', 'neons', 'neoza', 'nepal', 'neper', 'nepit', 'neral', 'nerds', 'nerka', 'nerol', 'nerts', 'nertz', 'nerve', 'nervy', 'nesty', 'nests', 'neter', 'netop', 'netty', 'netts', 'neuma', 'neume', 'neums', 'nevat', 'nevel', 'neven', 'never', 'neves', 'nevoy', 'nevus', 'newar', 'newel', 'newer', 'newly', 'newsy', 'newts', 'nexal', 'nexum', 'nexus', 'ngaio', 'ngapi', 'ngoko', 'ngoma', 'ngwee', 'nyaya', 'niais', 'nyala', 'niall', 'niata', 'nibby', 'nicer', 'niche', 'nicht', 'nicky', 'nicks', 'nicol', 'nidal', 'nided', 'nides', 'nidge', 'nydia', 'nidor', 'nidus', 'niece', 'niels', 'niepa', 'nieve', 'nific', 'nifle', 'nifty', 'nigel', 'nighs', 'night', 'nigre', 'nigua', 'nihal', 'nihil', 'nikau', 'nikko', 'nikon', 'nills', 'nylon', 'nilot', 'nimbi', 'nymil', 'nymph', 'nymss', 'nines', 'ninja', 'ninny', 'ninon', 'ninos', 'ninox', 'ninth', 'nintu', 'ninut', 'niobe', 'nyoro', 'niota', 'nipas', 'nippy', 'niris', 'nirls', 'nisan', 'nisei', 'nyssa', 'nisse', 'nisus', 'nitch', 'niter', 'nitid', 'niton', 'nitos', 'nitre', 'nitro', 'nitta', 'nitty', 'niuan', 'nival', 'nixed', 'nixer', 'nixes', 'nixie', 'nyxis', 'nixon', 'nizam', 'nizey', 'njave', 'nobby', 'nobel', 'nobis', 'noble', 'nobly', 'nobut', 'nocht', 'nocks', 'nodal', 'noddi', 'noddy', 'noded', 'nodes', 'nodus', 'noels', 'noemi', 'nogai', 'nogal', 'noggs', 'nohex', 'nohow', 'noyau', 'noily', 'noils', 'noint', 'noire', 'noise', 'noisy', 'nokta', 'nolle', 'nolos', 'nomad', 'nomap', 'nomas', 'nomen', 'nomes', 'nomic', 'nomoi', 'nomos', 'nonas', 'nonce', 'nonda', 'nondo', 'nones', 'nonet', 'nonya', 'nonic', 'nonyl', 'nonly', 'nonny', 'nooky', 'nooks', 'noons', 'noose', 'nopal', 'norah', 'noria', 'noric', 'norie', 'norit', 'norma', 'norms', 'norna', 'norry', 'norse', 'norsk', 'north', 'nosed', 'nosey', 'noser', 'noses', 'nosig', 'notal', 'notan', 'notch', 'noted', 'noter', 'notes', 'notre', 'notum', 'notus', 'nould', 'nouns', 'novae', 'novas', 'novel', 'novem', 'novum', 'novus', 'noway', 'nowch', 'nowed', 'nowel', 'nowts', 'noxal', 'npeel', 'nuadu', 'nubby', 'nubia', 'nucal', 'nucha', 'nucin', 'nuddy', 'nuder', 'nudes', 'nudge', 'nudie', 'nudum', 'nudzh', 'nugae', 'nukes', 'nullo', 'nulls', 'numac', 'numbs', 'numda', 'numen', 'numis', 'nummi', 'numps', 'numud', 'nunce', 'nunch', 'nunki', 'nunky', 'nunks', 'nunni', 'nunry', 'nuque', 'nurly', 'nurls', 'nurry', 'nurse', 'nursy', 'nutsy', 'oadal', 'oaken', 'oakum', 'oared', 'oaric', 'oasal', 'oases', 'oasis', 'oasts', 'oaten', 'oater', 'oaths', 'oaves', 'obeah', 'obeys', 'obeli', 'obese', 'obias', 'obiit', 'obits', 'objet', 'oblat', 'obley', 'obmit', 'oboes', 'obole', 'oboli', 'obols', 'occas', 'occur', 'ocean', 'ocher', 'ochna', 'ochre', 'ochry', 'ochro', 'ocyte', 'ocker', 'ocote', 'ocque', 'ocrea', 'octad', 'octal', 'octan', 'octet', 'octic', 'octyl', 'ocuby', 'oculi', 'odder', 'oddly', 'odell', 'odeon', 'odeum', 'odyle', 'odyls', 'odist', 'odium', 'odoom', 'odors', 'odour', 'oecus', 'oelet', 'oenin', 'ofays', 'offal', 'offed', 'offer', 'offic', 'often', 'ofter', 'oftly', 'ogams', 'ogeed', 'ogees', 'ogham', 'oghuz', 'ogive', 'ogled', 'ogler', 'ogles', 'ogmic', 'ogres', 'ohare', 'ohelo', 'ohias', 'ohing', 'ohmic', 'ohone', 'oyana', 'oicks', 'oidia', 'oyers', 'oiled', 'oiler', 'oylet', 'oinks', 'oisin', 'okays', 'okapi', 'okehs', 'okras', 'okrug', 'olcha', 'olchi', 'olden', 'older', 'oldie', 'oleic', 'olein', 'olena', 'olent', 'oleos', 'olepy', 'oleum', 'olios', 'oliva', 'ollas', 'ollav', 'ollie', 'ology', 'olona', 'olpae', 'olpes', 'olson', 'omaha', 'omani', 'omasa', 'omber', 'ombre', 'omega', 'omens', 'omers', 'omina', 'omits', 'omlah', 'omnes', 'omrah', 'oncer', 'onces', 'oncet', 'oncia', 'oncin', 'onery', 'onymy', 'onium', 'onker', 'onkos', 'onlay', 'onlap', 'onmun', 'onset', 'ontal', 'ontic', 'oobit', 'oohed', 'oolak', 'oolly', 'oomph', 'oopak', 'oopod', 'oorie', 'ootid', 'oozed', 'oozes', 'oozoa', 'opahs', 'opals', 'opata', 'opelu', 'opens', 'opera', 'ophic', 'ophir', 'ophis', 'opine', 'oping', 'opium', 'opsin', 'opted', 'optic', 'orach', 'oracy', 'orage', 'orale', 'orals', 'orang', 'orans', 'orant', 'oraon', 'orary', 'orate', 'orbed', 'orbic', 'orbit', 'orcas', 'orcin', 'order', 'ordos', 'oread', 'oreas', 'orgal', 'organ', 'orgia', 'orgic', 'orgue', 'orias', 'oribi', 'oriel', 'oriya', 'orion', 'oryza', 'orkey', 'orles', 'orlet', 'orlon', 'orlop', 'orlos', 'ormer', 'ornes', 'ornis', 'oromo', 'orpin', 'orpit', 'orris', 'orrow', 'orsel', 'orson', 'ortet', 'ortho', 'ortyx', 'ortol', 'orvet', 'osage', 'osaka', 'oscan', 'oscar', 'oscin', 'osela', 'oshac', 'oshea', 'oside', 'osier', 'oskar', 'osmic', 'osmin', 'osmol', 'osone', 'ossal', 'ossea', 'osset', 'ossia', 'ostia', 'ostic', 'otary', 'otate', 'other', 'othin', 'otyak', 'otium', 'otkon', 'otomi', 'ottar', 'otter', 'ottos', 'ouabe', 'ought', 'ouija', 'oukia', 'oulap', 'ounce', 'oundy', 'ounds', 'ouphe', 'ouphs', 'ourie', 'ousel', 'ousia', 'ousts', 'outas', 'outby', 'outdo', 'outed', 'outen', 'outer', 'outgo', 'outly', 'outre', 'ouvre', 'ouzel', 'ouzos', 'ovals', 'ovant', 'ovary', 'ovate', 'ovens', 'overs', 'overt', 'ovest', 'ovile', 'ovine', 'ovism', 'ovist', 'ovoid', 'ovoli', 'ovolo', 'ovula', 'ovule', 'owght', 'owing', 'owler', 'owlet', 'owned', 'owner', 'owsen', 'owser', 'oxane', 'oxboy', 'oxbow', 'oxeye', 'oxfly', 'oxide', 'oxids', 'oxime', 'oxims', 'oxlip', 'oxman', 'oxter', 'ozark', 'ozena', 'ozias', 'ozone', 'paauw', 'pablo', 'pacay', 'pacas', 'paced', 'pacer', 'paces', 'pacha', 'pacht', 'packs', 'pacos', 'pacta', 'pacts', 'padda', 'paddy', 'padge', 'padle', 'padou', 'padre', 'padri', 'padus', 'paean', 'paeon', 'pagan', 'paged', 'pager', 'pages', 'pagne', 'pagod', 'pagus', 'pahmi', 'pahos', 'payed', 'payee', 'payen', 'payer', 'paiks', 'pails', 'paine', 'payni', 'pains', 'paint', 'payor', 'pairs', 'pairt', 'paisa', 'paise', 'palay', 'palar', 'palas', 'palau', 'palch', 'palea', 'paled', 'paler', 'pales', 'palet', 'palew', 'palis', 'palki', 'palla', 'palli', 'pally', 'palls', 'pallu', 'palma', 'palmy', 'palmo', 'palms', 'palpi', 'palps', 'palsy', 'palta', 'palus', 'pamhy', 'pamir', 'pampa', 'panak', 'panax', 'panda', 'pandy', 'paned', 'panel', 'panes', 'panga', 'pangi', 'pangs', 'panic', 'panna', 'panne', 'panos', 'panse', 'pansy', 'panty', 'panto', 'pants', 'panus', 'paola', 'paolo', 'papal', 'papas', 'papaw', 'papey', 'paper', 'papio', 'papyr', 'pappi', 'pappy', 'papua', 'paque', 'parah', 'param', 'parao', 'paras', 'parch', 'parde', 'pardi', 'pardy', 'pardo', 'pards', 'pared', 'parel', 'paren', 'parer', 'pares', 'pareu', 'parge', 'pargo', 'paris', 'parka', 'parky', 'parks', 'parle', 'parli', 'parly', 'parma', 'parol', 'parra', 'parry', 'parrs', 'parse', 'parsi', 'parte', 'parti', 'party', 'parto', 'parts', 'parus', 'parve', 'pasan', 'pasch', 'paseo', 'pases', 'pasha', 'pashm', 'pasis', 'pasmo', 'passe', 'passo', 'passu', 'pasty', 'pasts', 'pasul', 'patao', 'patas', 'patch', 'pated', 'patee', 'patel', 'paten', 'pater', 'pates', 'pathy', 'paths', 'patia', 'patin', 'patio', 'patly', 'patsy', 'patta', 'patte', 'pattu', 'pauky', 'paula', 'pause', 'pauxi', 'pavan', 'paved', 'paven', 'paver', 'paves', 'pavia', 'pavid', 'pavin', 'pavis', 'pawaw', 'pawed', 'pawer', 'pawky', 'pawls', 'pawns', 'paxes', 'pbxes', 'peace', 'peage', 'peags', 'peaky', 'peaks', 'peals', 'peans', 'pearl', 'pears', 'peart', 'pease', 'peasy', 'peaty', 'peats', 'peavy', 'peban', 'pechs', 'pecht', 'pecky', 'pecks', 'pecos', 'pedal', 'pedee', 'pedes', 'pedro', 'pedum', 'peeke', 'peeks', 'peele', 'peels', 'peens', 'peeoy', 'peepy', 'peeps', 'peery', 'peers', 'peert', 'peeve', 'peggy', 'pegma', 'peine', 'peins', 'peise', 'peize', 'pekan', 'pekes', 'pekin', 'pekoe', 'peles', 'pelew', 'pelfs', 'pelon', 'pelta', 'pelts', 'penal', 'pence', 'penda', 'pendn', 'pends', 'penes', 'pengo', 'penis', 'penna', 'penni', 'penny', 'pense', 'pensy', 'penta', 'penup', 'peony', 'peons', 'pepla', 'pepos', 'peppy', 'pepsi', 'perai', 'perau', 'perca', 'perch', 'percy', 'perdy', 'perdu', 'peres', 'peril', 'peris', 'perit', 'perky', 'perks', 'perla', 'perle', 'perms', 'perry', 'perse', 'perty', 'perun', 'pesah', 'pesky', 'pesos', 'peste', 'pests', 'petal', 'peter', 'petit', 'petos', 'petre', 'petri', 'petro', 'petti', 'petty', 'petto', 'petum', 'peuhl', 'pewee', 'pewit', 'pflag', 'pfund', 'pgntt', 'phaca', 'phaet', 'phage', 'phane', 'phano', 'phare', 'pharm', 'pharo', 'phase', 'phasm', 'pheal', 'phebe', 'phene', 'pheny', 'pheon', 'phial', 'phies', 'phyla', 'phyle', 'phill', 'phyma', 'physa', 'phlox', 'phoby', 'phoca', 'phoma', 'phone', 'phony', 'phono', 'phons', 'phora', 'phose', 'phoss', 'photo', 'phots', 'phpht', 'phren', 'piaba', 'piala', 'piano', 'pians', 'piast', 'pibal', 'picae', 'pical', 'picas', 'picea', 'pyche', 'pichi', 'picky', 'picks', 'picot', 'picra', 'picry', 'picul', 'picus', 'pidan', 'piece', 'piend', 'piers', 'piert', 'piest', 'pieta', 'piete', 'piety', 'piezo', 'pygal', 'piggy', 'pight', 'pigly', 'pigmy', 'pygmy', 'piing', 'pyins', 'pikas', 'piked', 'pikey', 'pikel', 'piker', 'pikes', 'pikle', 'pilar', 'pylar', 'pilau', 'pilaw', 'pilch', 'pilea', 'piled', 'pilei', 'piler', 'piles', 'pylic', 'pilin', 'pilis', 'pills', 'pilmy', 'pilon', 'pylon', 'pilot', 'pilum', 'pilus', 'piman', 'pimas', 'pimps', 'pinal', 'pinas', 'pinax', 'pinch', 'pinda', 'pindy', 'pined', 'piney', 'piner', 'pines', 'pinge', 'pingo', 'pings', 'pinic', 'pinyl', 'pinky', 'pinko', 'pinks', 'pinna', 'pinny', 'pinon', 'pinot', 'pynot', 'pinta', 'pinte', 'pinto', 'pints', 'pinup', 'pinus', 'pyoid', 'pions', 'piotr', 'pious', 'pioxe', 'pipal', 'piped', 'pipey', 'piper', 'pipes', 'pipet', 'pipid', 'pipil', 'pipit', 'pippy', 'pipra', 'pique', 'pyral', 'pyran', 'pyres', 'pyrex', 'pyric', 'pirny', 'pirns', 'pirog', 'pirol', 'pirot', 'pyrus', 'pisay', 'pisan', 'pisco', 'pishu', 'pisky', 'piste', 'pisum', 'pitas', 'pitau', 'pitch', 'pithy', 'piths', 'piton', 'pitta', 'piuri', 'piute', 'pivot', 'piwut', 'pixel', 'pixes', 'pyxes', 'pixie', 'pyxie', 'pyxis', 'place', 'plack', 'plaga', 'plage', 'playa', 'plaid', 'plain', 'plays', 'plait', 'plane', 'plang', 'plank', 'plans', 'plant', 'plash', 'plasm', 'plass', 'platy', 'plato', 'plats', 'platt', 'plaud', 'plaza', 'plead', 'pleas', 'pleat', 'plebe', 'plebs', 'pleck', 'pleis', 'plena', 'pleny', 'pleon', 'plica', 'plied', 'plier', 'plyer', 'plies', 'pliny', 'plink', 'pliss', 'ploat', 'ploce', 'plock', 'plods', 'ploys', 'plomb', 'plonk', 'plook', 'plops', 'plote', 'plots', 'plott', 'plotx', 'plouk', 'plout', 'plows', 'pluck', 'pluff', 'plugs', 'pluma', 'plumb', 'plume', 'plumy', 'plump', 'plums', 'plunk', 'plupf', 'plush', 'pluto', 'pneum', 'poach', 'pobby', 'pocan', 'poche', 'pocky', 'pocks', 'pocul', 'pocus', 'podal', 'poddy', 'podex', 'podge', 'podgy', 'podia', 'podos', 'poems', 'poesy', 'poets', 'pogey', 'pogge', 'poggy', 'pohna', 'poilu', 'poind', 'point', 'poyou', 'poire', 'poise', 'pokan', 'poked', 'pokey', 'poker', 'pokes', 'pokie', 'pokom', 'polab', 'polar', 'poled', 'poley', 'poler', 'poles', 'polio', 'polyp', 'polis', 'polys', 'polit', 'polje', 'polka', 'polki', 'polly', 'polls', 'poloi', 'polos', 'pomak', 'pombe', 'pombo', 'pomey', 'pomel', 'pomes', 'pomme', 'pommy', 'pompa', 'pomps', 'ponca', 'ponce', 'pondy', 'pondo', 'ponds', 'poney', 'pones', 'ponga', 'pongo', 'ponja', 'ponos', 'ponto', 'pooch', 'poods', 'poohs', 'pooka', 'pooli', 'pooly', 'pools', 'poons', 'poops', 'poori', 'poort', 'pooty', 'poove', 'popal', 'popes', 'popie', 'poppa', 'poppy', 'popsy', 'poral', 'porch', 'pored', 'porer', 'pores', 'poret', 'porge', 'porgy', 'porgo', 'poria', 'porky', 'porks', 'porno', 'porns', 'poros', 'porry', 'porta', 'porte', 'porty', 'porto', 'ports', 'porus', 'posca', 'posed', 'posey', 'poser', 'poses', 'posho', 'posit', 'posse', 'possy', 'posts', 'potch', 'poter', 'potoo', 'potsy', 'potti', 'potty', 'potto', 'potus', 'pouce', 'pouch', 'poucy', 'pouff', 'poufs', 'poule', 'poulp', 'poult', 'pound', 'pours', 'pousy', 'pouty', 'pouts', 'powan', 'power', 'powny', 'poxed', 'poxes', 'pozzy', 'praam', 'prado', 'prahm', 'prahu', 'praya', 'prays', 'prams', 'prana', 'prand', 'prang', 'prank', 'praos', 'prase', 'prate', 'prats', 'pratt', 'praus', 'prawn', 'predy', 'preed', 'preen', 'prees', 'preys', 'prela', 'prepd', 'prepg', 'prepn', 'preps', 'presa', 'prese', 'press', 'prest', 'preta', 'preux', 'preve', 'prexy', 'priam', 'price', 'prich', 'pricy', 'prick', 'pride', 'pridy', 'pried', 'prier', 'pryer', 'pries', 'prigs', 'prill', 'prima', 'prime', 'primi', 'primy', 'primo', 'primp', 'prims', 'prine', 'prink', 'print', 'prion', 'prior', 'prise', 'pryse', 'prism', 'priss', 'prius', 'privy', 'prize', 'proal', 'proas', 'probe', 'prodd', 'prods', 'proem', 'profs', 'progs', 'proke', 'prole', 'promo', 'proms', 'prone', 'prong', 'proof', 'propr', 'props', 'prore', 'prose', 'prosy', 'proso', 'pross', 'prost', 'prote', 'proto', 'proud', 'prove', 'prowl', 'prows', 'proxy', 'prude', 'prudy', 'prunt', 'pruta', 'psalm', 'psend', 'pseud', 'pshav', 'pshaw', 'psych', 'psize', 'psoae', 'psoai', 'psoas', 'psora', 'pubal', 'pubes', 'pubic', 'pubis', 'puces', 'pucka', 'pucks', 'pudda', 'puddy', 'pudge', 'pudgy', 'pudic', 'pudsy', 'puffy', 'puffs', 'puget', 'puggi', 'puggy', 'pugil', 'puist', 'puked', 'puker', 'pukes', 'pukka', 'pulas', 'puled', 'puler', 'pules', 'pulex', 'pulik', 'pulis', 'pulka', 'pulli', 'pulls', 'pulpy', 'pulps', 'pulse', 'pumas', 'pumex', 'pumps', 'punan', 'punas', 'punce', 'punct', 'punga', 'pungi', 'pungy', 'pungs', 'punic', 'punka', 'punky', 'punks', 'punkt', 'punny', 'punta', 'punti', 'punty', 'punto', 'punts', 'pupae', 'pupal', 'pupas', 'pupil', 'puppy', 'purau', 'purda', 'purdy', 'pured', 'purey', 'purer', 'purga', 'purge', 'purim', 'purin', 'puris', 'purls', 'purre', 'purry', 'purrs', 'purse', 'pursy', 'purty', 'puses', 'pushy', 'pussy', 'putid', 'puton', 'putti', 'putty', 'putto', 'putts', 'qaids', 'qanat', 'qatar', 'qiana', 'qibla', 'qiyas', 'qophs', 'quack', 'quadi', 'quads', 'quaff', 'quags', 'quail', 'quais', 'quays', 'quake', 'quaky', 'quale', 'qualm', 'quant', 'quare', 'quark', 'quarl', 'quash', 'quasi', 'quass', 'quata', 'quate', 'quauk', 'quave', 'quawk', 'qubba', 'queak', 'queal', 'quean', 'queen', 'queer', 'queet', 'quegh', 'queys', 'quell', 'quelt', 'queme', 'quent', 'query', 'querl', 'quern', 'quest', 'queue', 'quica', 'quick', 'quids', 'quiet', 'quiff', 'quila', 'quill', 'quilt', 'quina', 'quink', 'quins', 'quint', 'quipo', 'quips', 'quipu', 'quira', 'quire', 'quirk', 'quirl', 'quirt', 'quist', 'quite', 'quito', 'quits', 'quitu', 'quoad', 'quods', 'quoin', 'quoit', 'quota', 'quote', 'quoth', 'quott', 'qursh', 'qurti', 'raash', 'rabal', 'rabat', 'rabbi', 'rabic', 'rabid', 'rabin', 'rabot', 'raced', 'racer', 'races', 'rache', 'racks', 'racon', 'radar', 'radek', 'radii', 'radio', 'radix', 'radly', 'radon', 'raffe', 'raffs', 'rafik', 'rafty', 'rafts', 'ragas', 'raged', 'ragee', 'rager', 'rages', 'raggy', 'raghu', 'ragis', 'rahul', 'raiae', 'rayah', 'rayan', 'raias', 'rayas', 'rayat', 'raids', 'rayed', 'rails', 'rainy', 'rains', 'rayon', 'raise', 'rajab', 'rajah', 'rajas', 'rajes', 'rajiv', 'rakan', 'raked', 'rakee', 'raker', 'rakes', 'rakis', 'rakit', 'rales', 'rally', 'ralph', 'ramal', 'raman', 'rambo', 'ramed', 'ramee', 'ramet', 'ramex', 'ramie', 'rammi', 'rammy', 'ramon', 'ramps', 'ramta', 'ramus', 'ranal', 'rance', 'randy', 'randn', 'rands', 'ranee', 'range', 'rangy', 'ranid', 'ranis', 'ranks', 'ranli', 'ranny', 'ranty', 'rants', 'raped', 'raper', 'rapes', 'raphe', 'rapic', 'rapid', 'rappe', 'rarer', 'rased', 'rasen', 'raser', 'rases', 'rason', 'raspy', 'rasps', 'rasse', 'rasty', 'ratal', 'ratan', 'ratch', 'rated', 'ratel', 'rater', 'rates', 'ratha', 'rathe', 'ratio', 'ratos', 'ratti', 'ratty', 'ratwa', 'rauli', 'raupo', 'raved', 'ravel', 'raven', 'raver', 'raves', 'ravin', 'rawer', 'rawin', 'rawky', 'rawly', 'raxed', 'raxes', 'razed', 'razee', 'razer', 'razes', 'razoo', 'razor', 'reaal', 'reach', 'react', 'readd', 'ready', 'readl', 'reads', 'reaks', 'realm', 'reals', 'reamy', 'reams', 'reaps', 'rearm', 'rears', 'reasy', 'reask', 'reast', 'reata', 'reave', 'rebab', 'rebag', 'reban', 'rebar', 'rebbe', 'rebec', 'rebed', 'rebeg', 'rebel', 'rebia', 'rebid', 'rebob', 'rebop', 'rebox', 'rebud', 'rebuy', 'rebus', 'rebut', 'recap', 'recce', 'reccy', 'recco', 'recip', 'recit', 'recks', 'recon', 'recpt', 'recta', 'recti', 'recto', 'recur', 'recut', 'redan', 'reddy', 'redds', 'reded', 'redes', 'redia', 'redid', 'redye', 'redig', 'redip', 'redly', 'redos', 'redox', 'redry', 'redub', 'redue', 'redug', 'redux', 'reedy', 'reeds', 'reefy', 'reefs', 'reeky', 'reeks', 'reels', 'reese', 'reesk', 'reest', 'reeve', 'refan', 'refed', 'refel', 'refer', 'reffo', 'refit', 'refix', 'refly', 'refry', 'regal', 'regel', 'reges', 'reget', 'regga', 'regia', 'regie', 'regin', 'regle', 'regma', 'regna', 'regur', 'rehem', 'rehid', 'rehoe', 'reice', 'reich', 'reify', 'reifs', 'reign', 'reina', 'reink', 'reins', 'reist', 'reive', 'rejig', 'rekey', 'relay', 'relap', 'relax', 'reles', 'relet', 'relic', 'relig', 'relit', 'relot', 'reman', 'remap', 'remen', 'remet', 'remex', 'remit', 'remix', 'remop', 'remue', 'remus', 'renay', 'renal', 'rends', 'rendu', 'reneg', 'renes', 'renet', 'renew', 'renga', 'renig', 'renin', 'renky', 'renne', 'rente', 'rents', 'reoil', 'reown', 'repad', 'repay', 'repas', 'repeg', 'repel', 'repen', 'repew', 'repic', 'repin', 'reply', 'repot', 'repps', 'repry', 'repro', 'reran', 'reree', 'rerig', 'rerob', 'rerow', 'rerub', 'rerun', 'resay', 'resat', 'resaw', 'resee', 'reset', 'resew', 'resex', 'resid', 'resin', 'resit', 'resow', 'resty', 'restr', 'rests', 'resue', 'resun', 'resup', 'retag', 'retal', 'retan', 'retar', 'retax', 'retch', 'retem', 'rethe', 'retia', 'retie', 'retin', 'retip', 'retry', 'retro', 'reuel', 'reune', 'reuse', 'revay', 'revel', 'rever', 'revet', 'revie', 'revue', 'rewan', 'rewax', 'rewed', 'rewet', 'rewin', 'rewon', 'rexen', 'rexes', 'rfree', 'rhamn', 'rheae', 'rheas', 'rheda', 'rheen', 'rheic', 'rhein', 'rhema', 'rheme', 'rheum', 'rhila', 'rhyme', 'rhymy', 'rhina', 'rhine', 'rhino', 'rhyta', 'rhoda', 'rhoeo', 'rhomb', 'rhumb', 'rials', 'riant', 'riata', 'ribat', 'rybat', 'ribby', 'ribes', 'riced', 'ricey', 'ricer', 'rices', 'riche', 'richt', 'ricin', 'ricky', 'ricks', 'riden', 'rider', 'ryder', 'rides', 'ridge', 'ridgy', 'riels', 'rifer', 'riffi', 'riffs', 'rifle', 'rifty', 'rifts', 'rigel', 'right', 'rigid', 'rigol', 'rigor', 'riyal', 'ryked', 'rykes', 'riled', 'riley', 'riles', 'rille', 'rilly', 'rills', 'rimal', 'rimas', 'rimed', 'rimer', 'rimes', 'rimpi', 'rinch', 'rinde', 'rindy', 'rynds', 'ringe', 'ringy', 'rings', 'rinka', 'rinks', 'rinse', 'riots', 'ryots', 'ripal', 'riped', 'ripen', 'riper', 'ripes', 'ripup', 'risen', 'riser', 'rises', 'rishi', 'risky', 'risks', 'risqu', 'risus', 'rites', 'rithe', 'ritsu', 'ritus', 'ritzy', 'rival', 'rived', 'rivel', 'riven', 'river', 'rives', 'rivet', 'rizar', 'roach', 'roads', 'roams', 'roans', 'roars', 'robed', 'rober', 'robes', 'robin', 'roble', 'robot', 'robur', 'roche', 'rocky', 'rocks', 'rocta', 'rodeo', 'rodge', 'rogan', 'roger', 'rogue', 'roguy', 'rohan', 'rohob', 'rohun', 'royal', 'royet', 'roily', 'roils', 'royou', 'roist', 'rojak', 'rokee', 'rokey', 'roker', 'roleo', 'roles', 'rolfe', 'rollo', 'romal', 'roman', 'romeo', 'romic', 'rompy', 'romps', 'rompu', 'ronco', 'ronde', 'rondo', 'ronga', 'ronin', 'ronni', 'roods', 'rooed', 'roofy', 'roofs', 'rooky', 'rooks', 'roomy', 'rooms', 'roosa', 'roose', 'roost', 'rooti', 'rooty', 'roots', 'roove', 'roped', 'ropey', 'roper', 'ropes', 'roque', 'roral', 'roric', 'rorid', 'rorty', 'rosal', 'rosed', 'rosel', 'roses', 'roset', 'roshi', 'rosin', 'rotal', 'rotan', 'rotas', 'rotch', 'roter', 'rotes', 'rotge', 'rotls', 'rotor', 'rotos', 'rotse', 'rotta', 'rotte', 'rouen', 'roues', 'rouge', 'rough', 'rougy', 'rouky', 'round', 'roupy', 'roups', 'rouse', 'roust', 'route', 'routh', 'routs', 'roved', 'roven', 'rover', 'roves', 'rovet', 'rowan', 'rowdy', 'rowed', 'rowel', 'rowen', 'rower', 'rowet', 'rowte', 'rowth', 'rowty', 'roxie', 'rozum', 'ruach', 'ruana', 'rubby', 'rubes', 'rubia', 'rubin', 'ruble', 'rubor', 'rubus', 'ruche', 'rucky', 'rucks', 'rudas', 'ruddy', 'rudds', 'ruder', 'rudge', 'ruely', 'ruers', 'ruffe', 'ruffs', 'rufus', 'rugae', 'rugal', 'rugby', 'ruggy', 'ruing', 'ruins', 'ruled', 'ruler', 'rules', 'rumal', 'ruman', 'rumba', 'rumbo', 'rumen', 'rumex', 'rumly', 'rummy', 'rumor', 'rumpy', 'rumps', 'runby', 'runch', 'rundi', 'runed', 'runer', 'runes', 'rungs', 'runic', 'runny', 'runsy', 'runty', 'runts', 'rupee', 'rupia', 'rupie', 'rural', 'ruses', 'rushy', 'rusin', 'rusky', 'rusks', 'rusma', 'rusot', 'russe', 'rusty', 'rusts', 'rutch', 'ruths', 'rutic', 'rutyl', 'rutin', 'rutty', 'ruvid', 'sabal', 'saban', 'sabby', 'sabed', 'saber', 'sabes', 'sabia', 'sabik', 'sabin', 'sabir', 'sable', 'sably', 'sabot', 'sabra', 'sabre', 'sabzi', 'sacae', 'sacks', 'sacra', 'sacre', 'sacry', 'sacro', 'sades', 'sadhe', 'sadhu', 'sadic', 'sadie', 'sadis', 'sadly', 'saeta', 'safar', 'safen', 'safer', 'safes', 'sagai', 'sagan', 'sagas', 'sager', 'sages', 'saggy', 'sagos', 'sagra', 'sagum', 'sahib', 'sahme', 'sayal', 'saice', 'saidi', 'saids', 'sayee', 'sayer', 'saify', 'saiga', 'saiid', 'sayid', 'saily', 'sails', 'saimy', 'sains', 'saint', 'saiph', 'sairy', 'sayst', 'saite', 'saith', 'saiva', 'sajou', 'sakai', 'sakel', 'saker', 'sakes', 'sakha', 'sakis', 'sakti', 'salay', 'salal', 'salar', 'salat', 'salem', 'salep', 'sales', 'salet', 'salic', 'salix', 'salle', 'sally', 'salma', 'salmi', 'salmo', 'salol', 'salon', 'salpa', 'salps', 'salse', 'salta', 'salts', 'salud', 'salue', 'salus', 'salva', 'salve', 'salvy', 'salvo', 'samaj', 'samal', 'saman', 'samas', 'samba', 'sambo', 'samek', 'samel', 'samen', 'samir', 'sammy', 'samoa', 'sampi', 'samps', 'sanai', 'sancy', 'sanct', 'sandy', 'sands', 'saned', 'saner', 'sanes', 'sanga', 'sangh', 'sangu', 'sanit', 'sanka', 'sansi', 'santa', 'santy', 'santo', 'sapan', 'sapek', 'sapid', 'sapin', 'sapit', 'saple', 'sapor', 'sappy', 'saqib', 'saraf', 'sarah', 'saran', 'sards', 'saree', 'sarge', 'sargo', 'sarif', 'sarin', 'sarip', 'saris', 'sarky', 'sarks', 'sarna', 'sarod', 'saron', 'saros', 'sarpo', 'sarra', 'sarsa', 'sarsi', 'saruk', 'sarum', 'sarus', 'sasan', 'sasin', 'sasse', 'sassy', 'satai', 'satan', 'sated', 'satem', 'sates', 'satin', 'satyr', 'satis', 'sauba', 'sauch', 'saudi', 'saugh', 'sauld', 'sauls', 'sault', 'sauna', 'saunt', 'saura', 'saury', 'sauty', 'sauve', 'saved', 'savey', 'saver', 'saves', 'savin', 'savoy', 'savor', 'savvy', 'sawah', 'sawan', 'sawed', 'sawer', 'sawny', 'saxes', 'saxon', 'sazen', 'scabs', 'scads', 'scaff', 'scags', 'scala', 'scald', 'scale', 'scalf', 'scaly', 'scall', 'scalp', 'scalt', 'scalx', 'scalz', 'scamp', 'scams', 'scans', 'scant', 'scape', 'scare', 'scarf', 'scary', 'scarn', 'scarp', 'scars', 'scart', 'scase', 'scats', 'scatt', 'scaul', 'scaum', 'scaup', 'scaur', 'scaut', 'scawd', 'scawl', 'sceat', 'scelp', 'scena', 'scend', 'scene', 'scent', 'schav', 'schiz', 'schmo', 'schuh', 'schul', 'schwa', 'scian', 'scyld', 'scind', 'scion', 'sciot', 'scyth', 'sclat', 'sclav', 'sclaw', 'scler', 'sclim', 'scoad', 'scobs', 'scoff', 'scoke', 'scolb', 'scold', 'scomm', 'scoon', 'scoop', 'scoot', 'scopa', 'scope', 'scops', 'score', 'scorn', 'scote', 'scots', 'scott', 'scouk', 'scoup', 'scour', 'scout', 'scove', 'scovy', 'scowl', 'scows', 'scrab', 'scrae', 'scrag', 'scray', 'scram', 'scran', 'scrat', 'scraw', 'scree', 'screw', 'scrim', 'scrin', 'scrip', 'scrit', 'scrob', 'scrod', 'scrog', 'scroo', 'scrow', 'scrub', 'scruf', 'scrum', 'scuba', 'scudi', 'scudo', 'scuds', 'scuff', 'scuft', 'sculk', 'scull', 'sculp', 'scult', 'scums', 'scups', 'scurf', 'scuse', 'scuta', 'scute', 'scuts', 'sdump', 'sealy', 'seals', 'seamy', 'seams', 'seary', 'sears', 'seats', 'seave', 'seavy', 'sebat', 'sebum', 'secco', 'secno', 'secos', 'secre', 'sects', 'secus', 'sedan', 'sedat', 'seder', 'sedge', 'sedgy', 'sedum', 'seech', 'seege', 'seeks', 'seely', 'seels', 'seems', 'seenu', 'seepy', 'seeps', 'seers', 'segar', 'seggy', 'segni', 'segno', 'segol', 'segos', 'segou', 'segue', 'sehyo', 'seige', 'seine', 'seise', 'seism', 'seity', 'seize', 'sekar', 'seker', 'sekos', 'selah', 'selfs', 'sella', 'selle', 'selli', 'selly', 'sells', 'selva', 'semee', 'semel', 'semen', 'semes', 'semic', 'semih', 'semis', 'senal', 'senam', 'sence', 'senci', 'sends', 'senex', 'sengi', 'senit', 'senna', 'senor', 'sensa', 'sense', 'senso', 'sensu', 'senti', 'sents', 'senvy', 'senza', 'seora', 'seoul', 'sepad', 'sepal', 'sepia', 'sepic', 'sepoy', 'seppa', 'septa', 'septi', 'septs', 'seqed', 'sequa', 'seqwl', 'serab', 'serac', 'serai', 'seral', 'serau', 'seraw', 'sered', 'sereh', 'serer', 'seres', 'serfs', 'serge', 'sergt', 'seric', 'serif', 'serin', 'serio', 'sermo', 'seron', 'serow', 'serra', 'serry', 'serta', 'serum', 'serut', 'servo', 'sesia', 'sesma', 'sessa', 'sesti', 'setae', 'setal', 'seton', 'setup', 'seugh', 'seven', 'sever', 'sevum', 'sewan', 'sewar', 'sewed', 'sewen', 'sewer', 'sewin', 'sexed', 'sexes', 'sexly', 'sexto', 'sexts', 'sfoot', 'sfree', 'shack', 'shade', 'shady', 'shado', 'shads', 'shaft', 'shags', 'shahi', 'shahs', 'shays', 'shaka', 'shaky', 'shako', 'shaku', 'shale', 'shaly', 'shall', 'shalt', 'shama', 'shame', 'shams', 'shane', 'shang', 'shank', 'shant', 'shape', 'shapy', 'shaps', 'shard', 'share', 'shari', 'shark', 'sharn', 'sharp', 'shaul', 'shaup', 'shave', 'shawy', 'shawl', 'shawm', 'shawn', 'shaws', 'sheaf', 'sheal', 'shean', 'shear', 'sheas', 'sheat', 'sheds', 'shedu', 'sheel', 'sheen', 'sheep', 'sheer', 'sheet', 'sheik', 'shela', 'sheld', 'shelf', 'shell', 'shema', 'shemu', 'shend', 'sheng', 'shent', 'sheol', 'sherd', 'sheth', 'sheva', 'shewa', 'shewn', 'shews', 'shiah', 'shiai', 'shyam', 'shice', 'shick', 'shide', 'shied', 'shiel', 'shier', 'shyer', 'shies', 'shift', 'shiko', 'shilf', 'shilh', 'shily', 'shyly', 'shill', 'shims', 'shina', 'shine', 'shiny', 'shins', 'ships', 'shipt', 'shire', 'shirk', 'shirl', 'shirr', 'shirt', 'shish', 'shisn', 'shist', 'shita', 'shits', 'shiva', 'shive', 'shivy', 'shivs', 'shlep', 'shluh', 'shoad', 'shoal', 'shoat', 'shock', 'shode', 'shoed', 'shoer', 'shoes', 'shogi', 'shogs', 'shoya', 'shoyu', 'shoji', 'shojo', 'shola', 'shole', 'shona', 'shone', 'shood', 'shooi', 'shook', 'shool', 'shoon', 'shoop', 'shoor', 'shoos', 'shoot', 'shope', 'shops', 'shore', 'shorl', 'shorn', 'short', 'shote', 'shots', 'shott', 'shout', 'shove', 'showd', 'showy', 'shown', 'shows', 'shrab', 'shraf', 'shrag', 'shram', 'shrap', 'shred', 'shree', 'shrew', 'shrip', 'shris', 'shrog', 'shrub', 'shrug', 'shuba', 'shuck', 'shuff', 'shuln', 'shuls', 'shune', 'shuns', 'shunt', 'shure', 'shurf', 'shush', 'shute', 'shuts', 'siafu', 'sials', 'sibby', 'sibbs', 'sibyl', 'sybil', 'sybow', 'sicca', 'sycee', 'sicel', 'sicer', 'sices', 'syces', 'sicht', 'sicks', 'sicle', 'sycon', 'sided', 'sider', 'sides', 'sidhe', 'sidia', 'sidle', 'sidth', 'siege', 'siena', 'siest', 'sieur', 'sieva', 'sieve', 'sievy', 'sifac', 'syftn', 'sifts', 'sighs', 'sight', 'sigil', 'sigla', 'sigma', 'signa', 'signs', 'sikar', 'siker', 'sikes', 'sykes', 'siket', 'sikhs', 'sikra', 'silas', 'silds', 'silen', 'silex', 'sylid', 'silyl', 'silky', 'silks', 'silly', 'sills', 'silos', 'sylph', 'silty', 'silts', 'silva', 'sylva', 'simal', 'simar', 'simas', 'simba', 'simia', 'simon', 'simps', 'simul', 'sinae', 'sinal', 'since', 'synch', 'syncs', 'sines', 'sinew', 'singe', 'singh', 'sings', 'sinhs', 'sinic', 'sinky', 'sinks', 'synod', 'sinon', 'synop', 'sinto', 'sintu', 'sinus', 'sioux', 'siped', 'siper', 'sipes', 'sipid', 'sippy', 'sired', 'siree', 'siren', 'syren', 'sires', 'sirex', 'syria', 'sirih', 'siris', 'sirki', 'sirky', 'syrma', 'siroc', 'sirop', 'siros', 'sirra', 'sirup', 'syrus', 'sisal', 'sisel', 'sises', 'sysin', 'sissy', 'sissu', 'sitao', 'sitar', 'sitch', 'sited', 'sites', 'sithe', 'sitio', 'sitka', 'sitta', 'situp', 'situs', 'siums', 'siusi', 'sivan', 'siver', 'siwan', 'sixer', 'sixes', 'sixmo', 'sixte', 'sixth', 'sixty', 'sizal', 'sizar', 'sized', 'sizer', 'sizes', 'sjaak', 'skaff', 'skags', 'skail', 'skair', 'skald', 'skart', 'skate', 'skats', 'skean', 'skeat', 'skeed', 'skeeg', 'skeel', 'skeen', 'skeer', 'skees', 'skeet', 'skegs', 'skeif', 'skein', 'skelf', 'skell', 'skelp', 'skemp', 'skene', 'skeps', 'skere', 'skers', 'skete', 'skewy', 'skewl', 'skews', 'skice', 'skidi', 'skids', 'skied', 'skyed', 'skiey', 'skyey', 'skier', 'skies', 'skiff', 'skift', 'skiis', 'skill', 'skime', 'skimo', 'skimp', 'skims', 'skink', 'skins', 'skint', 'skips', 'skyre', 'skirl', 'skirp', 'skirr', 'skirt', 'skite', 'skyte', 'skits', 'skive', 'skivy', 'skiwy', 'skoal', 'skoot', 'skout', 'skuas', 'skulk', 'skull', 'skulp', 'skunk', 'skuse', 'slabs', 'slack', 'slade', 'slags', 'slain', 'slays', 'slait', 'slake', 'slaky', 'slamp', 'slams', 'slane', 'slang', 'slank', 'slant', 'slape', 'slaps', 'slare', 'slart', 'slash', 'slask', 'slate', 'slath', 'slaty', 'slats', 'slaum', 'slave', 'slavi', 'slavs', 'slaws', 'sleck', 'sleds', 'sleek', 'sleep', 'sleer', 'sleet', 'sleys', 'slent', 'slept', 'slete', 'slews', 'slich', 'slick', 'slide', 'slier', 'slyer', 'slily', 'slyly', 'slime', 'slimy', 'slims', 'sline', 'sling', 'slink', 'slipe', 'slype', 'slips', 'slipt', 'slirt', 'slish', 'slite', 'slits', 'slive', 'sloan', 'sloat', 'slobs', 'slock', 'sloes', 'slogs', 'sloid', 'sloyd', 'slojd', 'sloka', 'sloke', 'slone', 'slonk', 'sloom', 'sloop', 'sloot', 'slope', 'slopy', 'slops', 'slorp', 'slosh', 'slote', 'sloth', 'slots', 'slour', 'slows', 'slubs', 'slued', 'sluer', 'slues', 'sluff', 'slugs', 'sluig', 'sluit', 'slump', 'slums', 'slung', 'slunk', 'slurb', 'slurp', 'slurs', 'slush', 'sluts', 'smack', 'smaik', 'small', 'smalm', 'smalt', 'smarm', 'smart', 'smash', 'smaze', 'smeek', 'smeer', 'smell', 'smelt', 'smerk', 'smeth', 'smews', 'smich', 'smift', 'smile', 'smily', 'smirk', 'smite', 'smith', 'smyth', 'smock', 'smogs', 'smoky', 'smoko', 'smolt', 'smook', 'smoos', 'smoot', 'smore', 'smote', 'smous', 'smout', 'smrgs', 'smurr', 'smuse', 'smush', 'smuts', 'snaff', 'snafu', 'snags', 'snail', 'snake', 'snaky', 'snape', 'snapy', 'snaps', 'snare', 'snary', 'snark', 'snarl', 'snash', 'snast', 'snath', 'snaws', 'snead', 'sneak', 'sneap', 'sneck', 'sneds', 'sneer', 'snell', 'snerp', 'snibs', 'snick', 'snide', 'snyed', 'snies', 'snyes', 'sniff', 'snift', 'snigs', 'snipe', 'snipy', 'snips', 'snirl', 'snirt', 'snite', 'snits', 'snitz', 'snivy', 'snobs', 'snock', 'snoek', 'snoga', 'snoke', 'snood', 'snook', 'snool', 'snoop', 'snoot', 'snore', 'snork', 'snort', 'snots', 'snout', 'snowy', 'snowk', 'snowl', 'snows', 'snubs', 'snuck', 'snuff', 'snugs', 'snurl', 'snurp', 'snurt', 'soaky', 'soaks', 'soapi', 'soapy', 'soaps', 'soary', 'soars', 'soave', 'sobby', 'sober', 'socht', 'socii', 'socky', 'socko', 'socks', 'socle', 'sodas', 'soddy', 'sodic', 'sodio', 'sodom', 'sofar', 'sofas', 'sofer', 'sofia', 'softa', 'softy', 'softs', 'soger', 'soget', 'soyas', 'soign', 'soily', 'soils', 'soyot', 'sojas', 'soken', 'sokes', 'solay', 'solan', 'solar', 'soldi', 'soldo', 'solea', 'soled', 'solen', 'soler', 'soles', 'solfa', 'solid', 'solio', 'solod', 'solon', 'solos', 'solum', 'solus', 'solve', 'somal', 'somas', 'somet', 'somma', 'somne', 'sonar', 'soncy', 'sonde', 'sones', 'songy', 'songo', 'songs', 'sonic', 'sonja', 'sonly', 'sonny', 'sonsy', 'sooey', 'sooke', 'sooky', 'soony', 'soord', 'sooth', 'sooty', 'soots', 'sophy', 'sophs', 'sopor', 'soppy', 'soral', 'soras', 'sorbs', 'sorda', 'sordo', 'sords', 'soree', 'sorel', 'sorer', 'sores', 'sorex', 'sorgo', 'sorns', 'sorra', 'sorry', 'sorty', 'sorts', 'sorus', 'sorva', 'sosia', 'sosie', 'soter', 'sotho', 'soths', 'sotie', 'sotik', 'sotol', 'sough', 'souly', 'souls', 'soulx', 'soulz', 'sound', 'soupy', 'soups', 'sourd', 'soury', 'sours', 'souse', 'south', 'sowan', 'sowar', 'sowed', 'sowel', 'sower', 'sowle', 'sowse', 'sowte', 'sozin', 'sozly', 'spaad', 'space', 'spacy', 'spack', 'spade', 'spado', 'spaed', 'spaer', 'spaes', 'spahi', 'spaid', 'spaik', 'spail', 'spain', 'spair', 'spays', 'spait', 'spake', 'spald', 'spale', 'spall', 'spalt', 'spane', 'spang', 'spank', 'spann', 'spans', 'spare', 'spary', 'spark', 'sparm', 'spars', 'spart', 'spasm', 'spass', 'spate', 'spath', 'spats', 'spave', 'spawl', 'spawn', 'speak', 'speal', 'spean', 'spear', 'spece', 'speck', 'specs', 'spect', 'speed', 'speel', 'speen', 'speer', 'speil', 'speir', 'spekt', 'spelk', 'spell', 'spelt', 'spend', 'spent', 'speos', 'spere', 'sperm', 'spete', 'spewy', 'spews', 'sphex', 'spial', 'spica', 'spick', 'spics', 'spied', 'spiel', 'spier', 'spyer', 'spies', 'spiff', 'spike', 'spiky', 'spiks', 'spile', 'spilt', 'spina', 'spine', 'spiny', 'spink', 'spins', 'spira', 'spire', 'spiry', 'spiro', 'spirt', 'spise', 'spiss', 'spite', 'spits', 'spitz', 'spivs', 'splad', 'splay', 'splat', 'splet', 'split', 'spock', 'spode', 'spoil', 'spoke', 'spoky', 'spole', 'spong', 'spoof', 'spook', 'spool', 'spoom', 'spoor', 'spoot', 'spore', 'sport', 'sposh', 'spots', 'spout', 'sprad', 'sprag', 'spray', 'sprat', 'spree', 'spret', 'sprew', 'sprig', 'sprit', 'sprod', 'sprot', 'sprue', 'sprug', 'spued', 'spues', 'spuke', 'spume', 'spumy', 'spung', 'spunk', 'spurl', 'spurn', 'spurs', 'spurt', 'sputa', 'spute', 'squab', 'squad', 'squam', 'squat', 'squaw', 'squeg', 'squet', 'squib', 'squid', 'squin', 'squit', 'squiz', 'sruti', 'ssing', 'ssort', 'sstor', 'staab', 'stabs', 'stacc', 'stacy', 'stack', 'stade', 'staff', 'stage', 'stagy', 'stags', 'staia', 'staid', 'staig', 'stail', 'stain', 'staio', 'stair', 'stays', 'stake', 'stale', 'stalk', 'stall', 'stamp', 'stand', 'stane', 'stang', 'stank', 'staph', 'stare', 'stary', 'stark', 'starn', 'starr', 'stars', 'start', 'starw', 'stash', 'state', 'stats', 'stauk', 'staun', 'staup', 'stave', 'stawn', 'stchi', 'stead', 'steal', 'steam', 'stean', 'stech', 'steed', 'steek', 'steel', 'steem', 'steen', 'steep', 'steer', 'stegh', 'steid', 'stein', 'stela', 'stele', 'stell', 'stema', 'stems', 'stend', 'steng', 'steno', 'stent', 'steps', 'stept', 'stere', 'steri', 'sterk', 'stern', 'stero', 'stert', 'stets', 'steve', 'stewy', 'stews', 'styan', 'styca', 'stich', 'stick', 'stied', 'styed', 'sties', 'styes', 'stife', 'stiff', 'stilb', 'stile', 'style', 'styli', 'still', 'stylo', 'stilt', 'stime', 'stimy', 'stymy', 'stine', 'sting', 'stink', 'stint', 'stion', 'stipa', 'stipe', 'stipo', 'stire', 'stirk', 'stirp', 'stirs', 'stite', 'stith', 'stive', 'stivy', 'stoae', 'stoai', 'stoas', 'stoat', 'stobs', 'stoep', 'stoff', 'stoga', 'stogy', 'stoic', 'stoit', 'stoke', 'stola', 'stold', 'stole', 'stoma', 'stomp', 'stond', 'stone', 'stong', 'stony', 'stonk', 'stood', 'stoof', 'stook', 'stool', 'stoon', 'stoop', 'stoot', 'stopa', 'stope', 'stops', 'stopt', 'store', 'story', 'stork', 'storm', 'stosh', 'stoss', 'stott', 'stoun', 'stoup', 'stour', 'stout', 'stowp', 'stows', 'strad', 'strae', 'strag', 'stray', 'stram', 'strap', 'stree', 'strey', 'strep', 'stret', 'strew', 'stria', 'strid', 'strig', 'strip', 'strit', 'strix', 'stroy', 'strom', 'strop', 'strow', 'strub', 'strue', 'strum', 'strut', 'struv', 'stubb', 'stube', 'stubs', 'stuck', 'stude', 'study', 'studs', 'stuff', 'stull', 'stulm', 'stump', 'stums', 'stung', 'stunk', 'stuns', 'stunt', 'stupa', 'stupe', 'stupp', 'sturk', 'sturt', 'stuss', 'suade', 'suant', 'suave', 'subah', 'subas', 'subch', 'suber', 'subet', 'subra', 'subst', 'succi', 'sucks', 'sucre', 'sudan', 'suddy', 'sudds', 'sudes', 'sudic', 'sudor', 'sudra', 'sudsy', 'suede', 'suent', 'suers', 'suety', 'suets', 'sueve', 'suevi', 'sugan', 'sugat', 'sughs', 'sugih', 'sugis', 'suina', 'suine', 'suing', 'suint', 'suyog', 'suist', 'suite', 'suity', 'suits', 'sukey', 'sulci', 'sulea', 'sulfa', 'sulfo', 'sulka', 'sulky', 'sulks', 'sulla', 'sully', 'sumac', 'sumak', 'sumen', 'summa', 'sumos', 'sumph', 'sumps', 'sumpt', 'sunil', 'sunna', 'sunni', 'sunny', 'sunns', 'sunup', 'suomi', 'supai', 'super', 'supes', 'suppl', 'supra', 'supvr', 'surah', 'sural', 'suras', 'surat', 'surds', 'sured', 'surer', 'sures', 'surfy', 'surfs', 'surge', 'surgy', 'surya', 'surly', 'surma', 'surra', 'susan', 'susie', 'sussy', 'susso', 'sutor', 'sutra', 'sutta', 'suzan', 'svelt', 'swabs', 'swack', 'swage', 'swags', 'swail', 'swain', 'sways', 'swale', 'swami', 'swamy', 'swamp', 'swang', 'swank', 'swans', 'swape', 'swaps', 'sward', 'sware', 'swarf', 'swarm', 'swart', 'swash', 'swath', 'swati', 'swats', 'swazi', 'sweal', 'swear', 'sweat', 'swede', 'sweep', 'sweer', 'swego', 'swell', 'swelp', 'swelt', 'swept', 'swerd', 'swick', 'swift', 'swigs', 'swile', 'swill', 'swimy', 'swims', 'swine', 'swing', 'swink', 'swipe', 'swipy', 'swird', 'swire', 'swirl', 'swish', 'swiss', 'swith', 'swive', 'swizz', 'swobs', 'swoln', 'swonk', 'swoon', 'swoop', 'swops', 'sword', 'swore', 'sworn', 'swosh', 'swots', 'swoun', 'swung', 'swure', 'taata', 'tabac', 'tabby', 'tabel', 'taber', 'tabes', 'tabet', 'tabic', 'tabid', 'tabis', 'tabla', 'table', 'tabog', 'taboo', 'tabor', 'tabus', 'tabut', 'tacan', 'tacca', 'taces', 'tacet', 'tache', 'tachi', 'tachs', 'tacit', 'tacky', 'tacks', 'tacso', 'tacts', 'taels', 'tafia', 'tagal', 'tagel', 'taggy', 'tagua', 'tagus', 'tahar', 'tahil', 'tahin', 'tahrs', 'tahua', 'taich', 'tayer', 'taiga', 'tayir', 'taily', 'tails', 'taino', 'tains', 'taint', 'taipi', 'taipo', 'tayra', 'tairn', 'taise', 'taish', 'tajes', 'tajik', 'takao', 'takar', 'taked', 'taken', 'taker', 'takes', 'takin', 'takyr', 'talak', 'talao', 'talar', 'talas', 'talck', 'talcs', 'taled', 'taler', 'tales', 'talio', 'talis', 'talky', 'talks', 'talli', 'tally', 'talma', 'talon', 'talpa', 'taluk', 'talus', 'tamal', 'tamas', 'tambo', 'tamed', 'tamer', 'tames', 'tamil', 'tamis', 'tammy', 'tampa', 'tamps', 'tamul', 'tamus', 'tanak', 'tanan', 'tandy', 'tanga', 'tangi', 'tango', 'tangs', 'tanha', 'tania', 'tanya', 'tanka', 'tanks', 'tanna', 'tanny', 'tanoa', 'tansy', 'tanti', 'tanto', 'tanzy', 'taped', 'tapen', 'taper', 'tapes', 'tapet', 'tapia', 'tapir', 'tapis', 'tapit', 'tapoa', 'tappa', 'tapul', 'taqua', 'taraf', 'tarai', 'tarau', 'tarde', 'tardy', 'tardo', 'tarea', 'tared', 'tareq', 'tares', 'tarfa', 'targe', 'tarie', 'tarin', 'tarmi', 'tarns', 'taroc', 'tarok', 'taros', 'tarot', 'tarps', 'tarre', 'tarri', 'tarry', 'tarse', 'tarsi', 'tarte', 'tarts', 'tarve', 'tasco', 'tasks', 'tasse', 'tatar', 'tates', 'tatie', 'tatoo', 'tatou', 'tatta', 'tatty', 'taube', 'taula', 'tauli', 'taunt', 'taupe', 'taupo', 'tauri', 'tauts', 'taver', 'tavoy', 'tawed', 'tawer', 'tawgi', 'tawie', 'tawny', 'tawpi', 'tawpy', 'tawse', 'taxed', 'taxer', 'taxes', 'taxin', 'taxir', 'taxis', 'taxon', 'taxor', 'taxus', 'tazia', 'tazza', 'tazze', 'tcawi', 'tchai', 'tchwi', 'teach', 'teaey', 'teaer', 'teaks', 'teals', 'teams', 'teary', 'tears', 'teart', 'tease', 'teasy', 'teaty', 'teats', 'teave', 'teaze', 'tebet', 'techy', 'tecla', 'tecon', 'tecta', 'tecum', 'teddy', 'tedge', 'teems', 'teeny', 'teens', 'teest', 'teeth', 'teety', 'teffs', 'tegua', 'tehee', 'teian', 'teiid', 'teind', 'teise', 'tejon', 'tekya', 'tekke', 'telae', 'telar', 'teleg', 'telei', 'teles', 'telex', 'telia', 'telic', 'telyn', 'telly', 'tells', 'tellt', 'teloi', 'telos', 'teman', 'tembe', 'tembu', 'temin', 'temne', 'tempe', 'tempi', 'tempo', 'temps', 'tempt', 'temse', 'tenai', 'tench', 'tendo', 'tends', 'tenet', 'tenez', 'tengu', 'tenia', 'tenio', 'tenla', 'tenne', 'tenno', 'tennu', 'tenon', 'tenor', 'tense', 'tenso', 'tenth', 'tenty', 'tents', 'tenue', 'tepal', 'tepas', 'tepee', 'tepid', 'tepor', 'terai', 'terap', 'teras', 'terce', 'terek', 'teres', 'tereu', 'terga', 'terma', 'terms', 'terna', 'terne', 'terns', 'terra', 'terre', 'terri', 'terry', 'terse', 'terzo', 'tesla', 'testa', 'teste', 'testy', 'tests', 'tetch', 'tetel', 'teths', 'teton', 'tetra', 'tetty', 'tetum', 'teuch', 'teugh', 'tewed', 'tewel', 'tewer', 'tewit', 'tewly', 'texan', 'texas', 'texts', 'thack', 'thais', 'thala', 'thana', 'thane', 'thank', 'tharf', 'tharm', 'thatd', 'thatn', 'thats', 'thave', 'thawy', 'thawn', 'thaws', 'theah', 'theat', 'theca', 'theek', 'theer', 'theet', 'theft', 'thegn', 'theyd', 'thein', 'their', 'thema', 'theme', 'thens', 'theol', 'theor', 'theos', 'theow', 'there', 'therm', 'these', 'theta', 'thete', 'thewy', 'thews', 'thick', 'thief', 'thigh', 'thilk', 'thill', 'thymi', 'thymy', 'thyms', 'thine', 'thing', 'think', 'thins', 'thiol', 'third', 'thirl', 'thirt', 'thisn', 'thoft', 'thoke', 'thole', 'tholi', 'thone', 'thong', 'thoom', 'thore', 'thorn', 'thoro', 'thorp', 'thort', 'those', 'thous', 'thowt', 'thram', 'thrap', 'thraw', 'thrax', 'three', 'threw', 'thrip', 'throb', 'throe', 'throu', 'throw', 'thrum', 'thruv', 'thuan', 'thuds', 'thugs', 'thuya', 'thuja', 'thule', 'thulr', 'thumb', 'thump', 'thund', 'thung', 'thuoc', 'thurl', 'thurm', 'thurt', 'tiang', 'tiara', 'tibby', 'tibbu', 'tibey', 'tiber', 'tibet', 'tibia', 'tical', 'ticca', 'ticer', 'tyche', 'ticky', 'ticks', 'ticul', 'tidal', 'tiddy', 'tided', 'tides', 'tydie', 'tyees', 'tiens', 'tiers', 'tiffy', 'tiffs', 'tiger', 'tight', 'tigon', 'tigre', 'tigua', 'tyigh', 'tying', 'tyken', 'tikes', 'tykes', 'tikis', 'tikka', 'tikor', 'tikur', 'tilak', 'tilda', 'tilde', 'tiled', 'tiler', 'tyler', 'tiles', 'tilia', 'tilly', 'tills', 'tilth', 'tilty', 'tilts', 'tylus', 'timar', 'timbe', 'timbo', 'timed', 'timer', 'times', 'timet', 'timid', 'timne', 'timon', 'timor', 'tinct', 'tinea', 'tined', 'tyned', 'tines', 'tynes', 'tinge', 'tingi', 'tings', 'tinne', 'tinni', 'tinny', 'tinsy', 'tinta', 'tinty', 'tints', 'typal', 'typed', 'typey', 'typer', 'types', 'typha', 'typic', 'tipis', 'tipit', 'tiple', 'typos', 'tippy', 'typps', 'tipsy', 'tipup', 'tiraz', 'tired', 'tyred', 'tirer', 'tires', 'tyres', 'tirls', 'tirma', 'tiros', 'tyros', 'tirve', 'tisar', 'tisic', 'tissu', 'tyste', 'titan', 'titar', 'titer', 'tithe', 'tythe', 'titis', 'title', 'titre', 'titty', 'titus', 'tiver', 'tiwaz', 'tizzy', 'tlaco', 'tmema', 'toady', 'toads', 'today', 'toddy', 'todea', 'todus', 'toffy', 'toffs', 'tofts', 'tofus', 'togae', 'togas', 'toged', 'togue', 'toher', 'toyed', 'toyer', 'toile', 'toils', 'toyon', 'toyos', 'toise', 'toist', 'toity', 'toits', 'tokay', 'toked', 'token', 'tokes', 'tokyo', 'tolan', 'tolas', 'toldo', 'toled', 'toles', 'tolyl', 'tolly', 'tolls', 'tolus', 'toman', 'tomas', 'tombe', 'tombs', 'tomes', 'tomia', 'tomin', 'tommy', 'tonal', 'tondi', 'tondo', 'toned', 'toner', 'tones', 'tonga', 'tongs', 'tonic', 'tonka', 'tonna', 'tonne', 'tonto', 'tonus', 'tools', 'toona', 'toons', 'toosh', 'tooth', 'toots', 'topas', 'topau', 'topaz', 'toped', 'topee', 'toper', 'topes', 'tophe', 'tophi', 'tophs', 'topia', 'topic', 'topis', 'topog', 'topoi', 'topos', 'toppy', 'topsy', 'topsl', 'toque', 'torah', 'toral', 'toran', 'toras', 'torch', 'torcs', 'tored', 'tores', 'toret', 'toric', 'torii', 'torma', 'toros', 'torse', 'torsi', 'torsk', 'torso', 'torta', 'torts', 'torus', 'torve', 'tosca', 'toshy', 'tossy', 'total', 'toted', 'totem', 'toter', 'totes', 'totty', 'totum', 'touch', 'tough', 'tould', 'tourn', 'tours', 'tourt', 'touse', 'tousy', 'toust', 'touts', 'tovah', 'tovar', 'tovet', 'towai', 'towan', 'towed', 'towel', 'tower', 'towie', 'towny', 'towns', 'towsy', 'toxic', 'toxin', 'toxon', 'tozee', 'tozer', 'trabu', 'trace', 'tracy', 'track', 'tract', 'trade', 'trady', 'tragi', 'traik', 'trail', 'train', 'trays', 'trait', 'trama', 'trame', 'tramp', 'trams', 'trank', 'trans', 'trant', 'trapa', 'traps', 'trapt', 'trash', 'trasy', 'trass', 'trave', 'trawl', 'tread', 'treas', 'treed', 'treey', 'treen', 'trees', 'trefa', 'treys', 'treks', 'trema', 'trend', 'trent', 'tress', 'trest', 'trets', 'trews', 'triac', 'triad', 'trial', 'trias', 'tribe', 'trica', 'trice', 'trick', 'tried', 'trier', 'tries', 'trifa', 'triga', 'trigo', 'trigs', 'trike', 'trill', 'tryma', 'trims', 'tryms', 'trina', 'trine', 'trink', 'triol', 'trior', 'trios', 'trypa', 'tripe', 'tripy', 'tripl', 'trips', 'tript', 'trist', 'tryst', 'trite', 'trixy', 'troad', 'troak', 'troat', 'troca', 'troch', 'trock', 'troco', 'trode', 'troft', 'trogs', 'troic', 'trois', 'troys', 'troke', 'troll', 'tromp', 'trona', 'tronc', 'trone', 'tronk', 'troop', 'troot', 'trooz', 'trope', 'troth', 'trots', 'troue', 'trouv', 'trove', 'trows', 'trubu', 'truce', 'truck', 'trudy', 'trued', 'truer', 'trues', 'truff', 'truly', 'trull', 'trump', 'trunk', 'trush', 'truss', 'trust', 'truth', 'tsade', 'tsadi', 'tsars', 'tsere', 'tsine', 'tsked', 'tsuba', 'tsubo', 'tsuga', 'tsuma', 'tuant', 'tuarn', 'tuart', 'tuath', 'tubae', 'tubal', 'tubar', 'tubas', 'tubba', 'tubby', 'tubed', 'tubes', 'tubig', 'tubik', 'tucky', 'tucks', 'tucum', 'tudel', 'tudor', 'tufan', 'tufas', 'tuffs', 'tufty', 'tufts', 'tugui', 'tuyer', 'tuism', 'tukra', 'tules', 'tulip', 'tulle', 'tulsa', 'tulsi', 'tumid', 'tumli', 'tummy', 'tumor', 'tumps', 'tunal', 'tunas', 'tunca', 'tuned', 'tuner', 'tunes', 'tunga', 'tungo', 'tungs', 'tunic', 'tunis', 'tunka', 'tunna', 'tunny', 'tupek', 'tupik', 'tuple', 'tuque', 'turbo', 'turco', 'turds', 'turfy', 'turfs', 'turgy', 'turio', 'turki', 'turks', 'turma', 'turns', 'turps', 'turse', 'turus', 'turvy', 'tushy', 'tushs', 'tusky', 'tusks', 'tutee', 'tutin', 'tutly', 'tutor', 'tutti', 'tutty', 'tutto', 'tutus', 'tuxes', 'tuzla', 'twaes', 'twain', 'twait', 'twale', 'twalt', 'twana', 'twang', 'twank', 'twant', 'twats', 'tweag', 'tweak', 'tweed', 'tweeg', 'tweel', 'tween', 'tweet', 'tweil', 'twere', 'twerp', 'twice', 'twick', 'twier', 'twyer', 'twigs', 'twill', 'twilt', 'twine', 'twiny', 'twink', 'twins', 'twint', 'twire', 'twirk', 'twirl', 'twirp', 'twist', 'twite', 'twits', 'twixt', 'twoes', 'tzaam', 'tzars', 'uayeb', 'ualis', 'uaupe', 'uchee', 'uckia', 'udasi', 'udder', 'udell', 'udish', 'uglis', 'ugric', 'uhlan', 'uhllo', 'uhuru', 'uigur', 'uinal', 'uinta', 'ukase', 'ulama', 'ulans', 'ulcer', 'ulcus', 'ulema', 'uller', 'ulmic', 'ulmin', 'ulmus', 'ulnad', 'ulnae', 'ulnar', 'ulnas', 'uloid', 'ulpan', 'ultra', 'uluhi', 'ululu', 'ulvan', 'ulvas', 'umaua', 'umbel', 'umber', 'umble', 'umbos', 'umbra', 'umbre', 'umest', 'umiac', 'umiak', 'umiaq', 'umiri', 'umist', 'ummps', 'umped', 'umpty', 'umset', 'unact', 'unadd', 'unais', 'unami', 'unamo', 'unapt', 'unary', 'unark', 'unarm', 'unaus', 'unbag', 'unbay', 'unbar', 'unbed', 'unbet', 'unbid', 'unbit', 'unbog', 'unboy', 'unbow', 'unbox', 'unbud', 'uncap', 'uncia', 'uncle', 'uncoy', 'uncos', 'uncow', 'uncus', 'uncut', 'undam', 'undee', 'unden', 'under', 'undid', 'undye', 'undig', 'undim', 'undog', 'undon', 'undry', 'undub', 'undue', 'undug', 'uneye', 'unfar', 'unfed', 'unfew', 'unfit', 'unfix', 'unfur', 'ungag', 'unget', 'ungka', 'ungod', 'ungot', 'ungum', 'unhad', 'unhap', 'unhat', 'unhex', 'unhid', 'unhip', 'unhit', 'unhot', 'uniat', 'unice', 'unify', 'uninn', 'union', 'unism', 'unist', 'unite', 'unity', 'units', 'unius', 'unjam', 'unked', 'unkey', 'unken', 'unket', 'unkid', 'unkin', 'unlay', 'unlap', 'unlaw', 'unlax', 'unled', 'unlet', 'unlid', 'unlie', 'unlit', 'unmad', 'unman', 'unmet', 'unmew', 'unmix', 'unnet', 'unnew', 'unode', 'unoil', 'unold', 'unona', 'unorn', 'unown', 'unpay', 'unpeg', 'unpen', 'unpin', 'unpot', 'unput', 'unray', 'unram', 'unred', 'unrid', 'unrig', 'unrip', 'unrow', 'unrra', 'unrun', 'unsad', 'unsay', 'unsee', 'unset', 'unsew', 'unsex', 'unshy', 'unsin', 'unsly', 'unson', 'unsty', 'unsun', 'untap', 'untar', 'untax', 'untie', 'until', 'untin', 'untop', 'unurn', 'unuse', 'unwan', 'unwax', 'unweb', 'unwed', 'unwet', 'unwig', 'unwit', 'unwon', 'unwry', 'unzen', 'unzip', 'upaya', 'uparm', 'upbay', 'upbar', 'upbid', 'upbye', 'upbuy', 'upcry', 'upcut', 'updos', 'updry', 'upeat', 'upend', 'upfly', 'upget', 'upher', 'upjet', 'uplay', 'upleg', 'uplit', 'upmix', 'upped', 'upper', 'uppop', 'uprid', 'uprip', 'uprun', 'upsey', 'upset', 'upsit', 'upsun', 'upsup', 'uptie', 'upupa', 'upway', 'upwax', 'uraei', 'urali', 'urare', 'urari', 'urase', 'urate', 'urban', 'urbic', 'urdee', 'ureal', 'ureas', 'uredo', 'ureic', 'ureid', 'urena', 'urent', 'urged', 'urger', 'urges', 'uriah', 'urial', 'urian', 'uriel', 'urine', 'urite', 'urlar', 'urled', 'urman', 'urnae', 'urnal', 'ursae', 'ursal', 'ursid', 'urson', 'ursuk', 'ursus', 'urubu', 'urucu', 'urutu', 'usage', 'usant', 'usara', 'usent', 'users', 'ushak', 'ushas', 'usher', 'usine', 'using', 'uskok', 'usnea', 'usnic', 'usnin', 'usque', 'uster', 'usual', 'usure', 'usury', 'usurp', 'utchy', 'utees', 'utend', 'uteri', 'utero', 'uther', 'utick', 'utile', 'utrum', 'utsuk', 'utter', 'uvala', 'uvate', 'uveal', 'uveas', 'uviol', 'uvito', 'uvres', 'uvrou', 'uvula', 'uvver', 'uzara', 'uzbak', 'uzbeg', 'uzbek', 'vache', 'vacoa', 'vacua', 'vacuo', 'vadim', 'vadis', 'vagal', 'vagas', 'vague', 'vagus', 'vails', 'vaire', 'vairy', 'vairs', 'vajra', 'vakia', 'vakil', 'vales', 'valet', 'valew', 'valid', 'valyl', 'valmy', 'valor', 'valsa', 'valse', 'value', 'valva', 'valve', 'vamos', 'vamps', 'vance', 'vanda', 'vaned', 'vanes', 'vangs', 'vanir', 'vapid', 'vapor', 'vappa', 'varan', 'varas', 'varda', 'vardy', 'varec', 'varia', 'vario', 'varix', 'varna', 'varus', 'varve', 'vasal', 'vases', 'vasty', 'vasts', 'vates', 'vatic', 'vaudy', 'vault', 'vaunt', 'vealy', 'veals', 'vedda', 'vedet', 'vedic', 'vedro', 'veena', 'veeps', 'veery', 'veers', 'vefry', 'vegas', 'vehme', 'veily', 'veils', 'veiny', 'veins', 'vejoz', 'velal', 'velar', 'velds', 'veldt', 'velic', 'velte', 'velum', 'venae', 'venal', 'vends', 'vened', 'venge', 'venie', 'venin', 'venom', 'venta', 'vents', 'venue', 'venus', 'vepse', 'veray', 'verby', 'verbs', 'verde', 'verdi', 'verey', 'verek', 'verge', 'vergi', 'verpa', 'verre', 'verry', 'versa', 'verse', 'verso', 'verst', 'verty', 'verts', 'vertu', 'verus', 'verve', 'vespa', 'vesta', 'vests', 'vetch', 'veter', 'vetus', 'veuve', 'vexed', 'vexer', 'vexes', 'vexil', 'viage', 'vials', 'viand', 'vyase', 'vibes', 'vibex', 'vibix', 'vicar', 'viced', 'vices', 'vichy', 'vicia', 'vicki', 'vicky', 'vicua', 'vicus', 'video', 'vidya', 'vidry', 'vidua', 'viers', 'viewy', 'views', 'vifda', 'vigas', 'vigia', 'vigil', 'vigor', 'vying', 'vijay', 'vijao', 'viler', 'villa', 'ville', 'villi', 'vills', 'vimen', 'vimpa', 'vinal', 'vinas', 'vinca', 'vince', 'vinci', 'vinea', 'vined', 'viner', 'vines', 'vinet', 'vinew', 'vingt', 'vinic', 'vinyl', 'vinny', 'vinod', 'vinos', 'vinta', 'vinum', 'viola', 'viols', 'viper', 'viral', 'vireo', 'vires', 'virga', 'virge', 'virgo', 'virid', 'virls', 'viron', 'virtu', 'virus', 'visas', 'vised', 'vises', 'visie', 'visit', 'visne', 'vison', 'visor', 'vista', 'visto', 'vitae', 'vital', 'vitis', 'vitra', 'vitry', 'vitro', 'vitta', 'viuva', 'vivas', 'vivat', 'vivax', 'vivda', 'vivek', 'viver', 'vives', 'vivid', 'vivos', 'vivre', 'vixen', 'vizir', 'vizor', 'vizzy', 'vlach', 'vobis', 'vocab', 'vocal', 'vocat', 'voces', 'voder', 'vodum', 'vodun', 'vogie', 'vogue', 'vogul', 'voice', 'voids', 'voila', 'voile', 'volar', 'voled', 'voles', 'volet', 'volga', 'volow', 'volta', 'volte', 'volti', 'volto', 'volts', 'volva', 'vomer', 'vomit', 'voraz', 'votal', 'voted', 'voter', 'votes', 'vouch', 'vouge', 'vouli', 'voust', 'vowed', 'vowel', 'vower', 'vraic', 'vroom', 'vrouw', 'vrows', 'vucom', 'vuggy', 'vuggs', 'vughs', 'vulgo', 'vulva', 'waapa', 'waasi', 'wabby', 'wacke', 'wacky', 'wacks', 'waddy', 'waded', 'wader', 'wades', 'wadge', 'wadis', 'wadna', 'waefu', 'waffs', 'wafty', 'wafts', 'waged', 'wager', 'wages', 'waget', 'wagga', 'waggy', 'wagon', 'wahoo', 'wayao', 'waifs', 'waily', 'wails', 'wayne', 'wains', 'waird', 'wairs', 'waise', 'waist', 'waits', 'waive', 'wakan', 'wakas', 'waked', 'waken', 'waker', 'wakes', 'wakhi', 'wakif', 'wakon', 'waled', 'waler', 'wales', 'walks', 'walla', 'wally', 'walls', 'walsh', 'walth', 'walty', 'waltz', 'wamel', 'wames', 'wamus', 'wandy', 'wands', 'waned', 'waney', 'wanes', 'wanga', 'wanky', 'wanle', 'wanly', 'wanna', 'wanny', 'wanty', 'wants', 'wanze', 'wappo', 'warch', 'wards', 'wared', 'wares', 'warks', 'warly', 'warms', 'warns', 'warnt', 'warps', 'warri', 'warse', 'warst', 'warth', 'warty', 'warts', 'warua', 'warve', 'wasat', 'wasco', 'wasel', 'washy', 'washo', 'wasir', 'wasnt', 'waspy', 'wasps', 'waste', 'wasty', 'wasts', 'watap', 'watch', 'watts', 'wauch', 'waugh', 'wauks', 'wauls', 'wauns', 'waura', 'wauve', 'waved', 'wavey', 'waver', 'waves', 'wawah', 'wawls', 'waxed', 'waxen', 'waxer', 'waxes', 'wazir', 'weaky', 'weald', 'weals', 'weans', 'weary', 'wears', 'weave', 'webby', 'weber', 'wecht', 'wedel', 'wedge', 'wedgy', 'weeda', 'weedy', 'weeds', 'weeks', 'weeny', 'weens', 'weent', 'weepy', 'weeps', 'weesh', 'weest', 'weety', 'weets', 'weeze', 'wefty', 'wefts', 'wehee', 'weigh', 'weird', 'weirs', 'weism', 'wekas', 'wekau', 'welch', 'welds', 'welly', 'wells', 'welsh', 'welts', 'wemmy', 'wench', 'wende', 'wendi', 'wendy', 'wends', 'wenny', 'weren', 'wersh', 'weste', 'westy', 'wests', 'wetly', 'wevet', 'wezen', 'whack', 'whale', 'whaly', 'whalm', 'whalp', 'whame', 'whamp', 'whams', 'whand', 'whang', 'whank', 'whaps', 'whare', 'wharf', 'wharl', 'wharp', 'whart', 'whase', 'whata', 'whatd', 'whats', 'whauk', 'whaup', 'whaur', 'wheal', 'wheam', 'wheel', 'wheem', 'wheen', 'wheep', 'wheer', 'wheft', 'whein', 'wheys', 'wheki', 'whelk', 'whelm', 'whelp', 'whens', 'where', 'whets', 'whewl', 'whews', 'whewt', 'whiba', 'which', 'whick', 'whids', 'whiff', 'whift', 'whigs', 'while', 'whilk', 'whill', 'whils', 'whims', 'whine', 'whing', 'whiny', 'whins', 'whips', 'whipt', 'whirl', 'whirr', 'whirs', 'whish', 'whisp', 'whiss', 'whist', 'white', 'whity', 'whits', 'whizz', 'whole', 'wholl', 'whomp', 'whone', 'whoof', 'whoop', 'whoot', 'whops', 'whore', 'whory', 'whorl', 'whort', 'whose', 'whoso', 'whsle', 'whuff', 'whulk', 'whump', 'whush', 'whute', 'wicca', 'wicht', 'wicky', 'wicks', 'widdy', 'widen', 'wider', 'wides', 'widow', 'width', 'wield', 'wierd', 'wifed', 'wifes', 'wifie', 'wigan', 'wiggy', 'wight', 'wiyat', 'wiyot', 'wilco', 'wilds', 'wiled', 'wyled', 'wiles', 'wyles', 'wilga', 'willi', 'willy', 'wills', 'wilts', 'wince', 'winch', 'windy', 'winds', 'wynds', 'windz', 'wined', 'winey', 'winer', 'wines', 'wingy', 'winks', 'winly', 'winna', 'wynne', 'wynns', 'winos', 'winze', 'wiped', 'wiper', 'wipes', 'wired', 'wirer', 'wires', 'wiros', 'wirra', 'wised', 'wisen', 'wiser', 'wises', 'wisha', 'wishy', 'wisht', 'wyson', 'wispy', 'wisps', 'wisse', 'wiste', 'wysty', 'wists', 'witan', 'witch', 'wited', 'wyted', 'witen', 'wites', 'wytes', 'withe', 'withy', 'witty', 'wived', 'wiver', 'wyver', 'wives', 'wizen', 'wizes', 'wlity', 'wloka', 'woady', 'woads', 'woald', 'wocas', 'woden', 'wodge', 'wodgy', 'woful', 'wogul', 'woibe', 'wokas', 'woken', 'woldy', 'wolds', 'wolfs', 'wolly', 'wolof', 'wolve', 'woman', 'womby', 'wombs', 'women', 'wonga', 'wonky', 'wonna', 'wonts', 'woody', 'woods', 'wooed', 'wooer', 'woofy', 'woofs', 'woold', 'woolf', 'wooly', 'wools', 'woomp', 'woons', 'woops', 'woosh', 'wootz', 'woozy', 'wopsy', 'wordy', 'words', 'worky', 'works', 'world', 'wormy', 'worms', 'worry', 'worse', 'worst', 'worth', 'worts', 'wouch', 'wough', 'would', 'wound', 'woven', 'wowed', 'wrack', 'wramp', 'wrang', 'wraps', 'wrapt', 'wrast', 'wrath', 'wrawl', 'wreak', 'wreat', 'wreck', 'wrens', 'wrest', 'wrick', 'wride', 'wried', 'wrier', 'wryer', 'wries', 'wryly', 'wring', 'wrist', 'write', 'writh', 'writs', 'wrive', 'wroke', 'wrong', 'wroot', 'wrote', 'wroth', 'wrung', 'wudge', 'wunna', 'wurly', 'wurst', 'wuzzy', 'xebec', 'xenia', 'xenic', 'xenyl', 'xenon', 'xenos', 'xeres', 'xeric', 'xerox', 'xerus', 'xicak', 'xylan', 'xylem', 'xylia', 'xylic', 'xylyl', 'xylol', 'xylon', 'xinca', 'xyrid', 'xyris', 'xysti', 'xysts', 'xoana', 'xurel', 'xviii', 'xxiii', 'zabra', 'zabti', 'zayat', 'zayin', 'zaire', 'zakah', 'zakat', 'zaman', 'zambo', 'zamia', 'zande', 'zante', 'zanza', 'zanze', 'zapas', 'zapus', 'zaque', 'zarfs', 'zaxes', 'zazen', 'zeals', 'zebec', 'zebra', 'zebub', 'zebus', 'zeins', 'zeism', 'zeiss', 'zeist', 'zemmi', 'zemni', 'zendo', 'zerda', 'zerma', 'zeros', 'zests', 'zetas', 'zhmud', 'ziara', 'zibet', 'ziega', 'ziffs', 'zygal', 'zigan', 'zygon', 'zihar', 'zilch', 'zilla', 'zills', 'zimbi', 'zymes', 'zymic', 'zymin', 'zimme', 'zimmi', 'zimmy', 'zincy', 'zinco', 'zincs', 'zineb', 'zingy', 'zings', 'zinke', 'zinky', 'zippy', 'zirai', 'zirak', 'ziram', 'zitis', 'zizel', 'zizia', 'zizit', 'zlote', 'zloty', 'zmudz', 'zoaea', 'zocco', 'zoeae', 'zoeal', 'zoeas', 'zogan', 'zohak', 'zoism', 'zoist', 'zokor', 'zolle', 'zombi', 'zonal', 'zonar', 'zonda', 'zoned', 'zoner', 'zones', 'zonic', 'zonta', 'zooid', 'zooks', 'zooms', 'zoona', 'zoons', 'zooty', 'zoque', 'zoril', 'zoris', 'zorro', 'zosma', 'zowie', 'zucco', 'zudda', 'zulus', 'zunis', 'urmom', 'jabba', 'soare'] };

    const ROWS = 6;
    const COLS = 5;
    function validate(choice, cookieChoices) {
        const choices = Object.keys(choice);
        const chosen = Object.keys(cookieChoices);
        if (chosen.length !== choices.length) {
            return false;
        }
        return chosen.every(c => choices.includes(c));
    }
    let words = Object.assign(Object.assign({}, words$1), { contains: (word) => {
            return words$1.words.includes(word) || words$1.valid.includes(word); // No need to use food words also as they are already in valid
        } });
    function CheckFoodMode(state) {
        if (state.foodOnly) {
            words.active_words = words.food;
        }
        else {
            words.active_words = words.words;
        }
    }
    function checkHardMode(board, row) {
        for (let i = 0; i < COLS; ++i) {
            if (board.state[row - 1][i] === "🟩" && board.words[row - 1][i] !== board.words[row][i]) {
                return { pos: i, char: board.words[row - 1][i], type: "🟩" };
            }
        }
        for (let i = 0; i < COLS; ++i) {
            if (board.state[row - 1][i] === "🟨" && !board.words[row].includes(board.words[row - 1][i])) {
                return { pos: i, char: board.words[row - 1][i], type: "🟨" };
            }
        }
        return { pos: -1, char: "", type: "⬛" };
    }
    class Tile$1 {
        constructor() {
            this.notSet = new Set();
        }
        not(char) {
            this.notSet.add(char);
        }
    }
    class WordData {
        constructor() {
            this.notSet = new Set();
            this.letterCounts = new Map();
            this.word = [];
            for (let col = 0; col < COLS; ++col) {
                this.word.push(new Tile$1());
            }
        }
        confirmCount(char) {
            let c = this.letterCounts.get(char);
            if (!c) {
                this.not(char);
            }
            else {
                c[1] = true;
            }
        }
        countConfirmed(char) {
            const val = this.letterCounts.get(char);
            return val ? val[1] : false;
        }
        setCount(char, count) {
            let c = this.letterCounts.get(char);
            if (!c) {
                this.letterCounts.set(char, [count, false]);
            }
            else {
                c[0] = count;
            }
        }
        incrementCount(char) {
            ++this.letterCounts.get(char)[0];
        }
        not(char) {
            this.notSet.add(char);
        }
        inGlobalNotList(char) {
            return this.notSet.has(char);
        }
        lettersNotAt(pos) {
            return new Set([...this.notSet, ...this.word[pos].notSet]);
        }
    }
    function getRowData(n, board) {
        const wd = new WordData();
        for (let row = 0; row < n; ++row) {
            const occured = new Set();
            for (let col = 0; col < COLS; ++col) {
                const state = board.state[row][col];
                const char = board.words[row][col];
                if (state === "⬛") {
                    wd.confirmCount(char);
                    // if char isn't in the global not list add it to the not list for that position
                    if (!wd.inGlobalNotList(char)) {
                        wd.word[col].not(char);
                    }
                    continue;
                }
                // If this isn't the first time this letter has occured in this row
                if (occured.has(char)) {
                    wd.incrementCount(char);
                }
                else if (!wd.countConfirmed(char)) {
                    occured.add(char);
                    wd.setCount(char, 1);
                }
                if (state === "🟩") {
                    wd.word[col].value = char;
                }
                else { // if (state === "🟨")
                    wd.word[col].not(char);
                }
            }
        }
        let exp = "";
        for (let pos = 0; pos < wd.word.length; ++pos) {
            exp += wd.word[pos].value ? wd.word[pos].value : `[^${[...wd.lettersNotAt(pos)].join(" ")}]`;
        }
        return (word) => {
            if (new RegExp(exp).test(word)) {
                const chars = word.split("");
                for (const e of wd.letterCounts) {
                    const occurences = countOccurences(chars, e[0]);
                    if (!occurences || (e[1][1] && occurences !== e[1][0]))
                        return false;
                }
                return true;
            }
            return false;
        };
    }
    function countOccurences(arr, val) {
        return arr.reduce((count, v) => v === val ? count + 1 : count, 0);
    }
    function getState(word, guess) {
        const charArr = word.split("");
        const result = Array(5).fill("⬛");
        for (let i = 0; i < word.length; ++i) {
            if (charArr[i] === guess.charAt(i)) {
                result[i] = "🟩";
                charArr[i] = "$";
            }
        }
        for (let i = 0; i < word.length; ++i) {
            const pos = charArr.indexOf(guess[i]);
            if (result[i] !== "🟩" && pos >= 0) {
                charArr[pos] = "$";
                result[i] = "🟨";
            }
        }
        return result;
    }
    function contractNum(n) {
        switch (n % 10) {
            case 1:
                return `${n}st`;
            case 2:
                return `${n}nd`;
            case 3:
                return `${n}rd`;
            default:
                return `${n}th`;
        }
    }
    const keys = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
    function newSeed(mode) {
        const now = Date.now();
        switch (mode) {
            case GameMode.daily:
                // Adds time zome offset to UTC time, calculates how many days that falls after 1/1/1970
                // and returns the unix time for the beginning of that day.
                return Date.UTC(1970, 0, 1 + Math.floor((now - (new Date().getTimezoneOffset() * ms.MINUTE)) / ms.DAY));
            case GameMode.hourly:
                return now - (now % ms.HOUR);
            // case GameMode.minutely:
            // 	return now - (now % ms.MINUTE);
            case GameMode.infinite:
                return now - (now % ms.SECOND);
        }
    }
    const modeData = {
        default: GameMode.daily,
        modes: [
            {
                name: "Daily",
                unit: ms.DAY,
                start: 1642370400000,
                seed: newSeed(GameMode.daily),
                historical: false,
                streak: true,
            },
            {
                name: "Hourly",
                unit: ms.HOUR,
                start: 1642528800000,
                seed: newSeed(GameMode.hourly),
                historical: false,
                icon: "m50,7h100v33c0,40 -35,40 -35,60c0,20 35,20 35,60v33h-100v-33c0,-40 35,-40 35,-60c0,-20 -35,-20 -35,-60z",
                streak: true,
            },
            {
                name: "Infinite",
                unit: ms.SECOND,
                start: 1642428600000,
                seed: newSeed(GameMode.infinite),
                historical: false,
                icon: "m7,100c0,-50 68,-50 93,0c25,50 93,50 93,0c0,-50 -68,-50 -93,0c-25,50 -93,50 -93,0z",
            }
            // {
            // 	name: "Minutely",
            // 	unit: ms.MINUTE,
            // 	start: 1642528800000,	// 18/01/2022 8:00pm
            // 	seed: newSeed(GameMode.minutely),
            // 	historical: false,
        ]
    };
    function getWordNumber(mode) {
        return Math.round((modeData.modes[mode].seed - modeData.modes[mode].start) / modeData.modes[mode].unit) + 1;
    }
    function seededRandomInt(min, max, seed) {
        const rng = seedrandom(`${seed}`);
        return Math.floor(min + (max - min) * rng());
    }
    const DELAY_INCREMENT = 200;
    const PRAISE = [
        "Genius",
        "Magnificent",
        "Impressive",
        "Splendid",
        "Great",
        "Phew",
    ];
    function createNewGame(mode) {
        return {
            active: true,
            guesses: 0,
            time: modeData.modes[mode].seed,
            wordNumber: getWordNumber(mode),
            validHard: true,
            foodOnly: false,
            board: {
                words: Array(ROWS).fill(""),
                state: Array.from({ length: ROWS }, () => (Array(COLS).fill("🔳")))
            },
        };
    }
    function createDefaultSettings() {
        return {
            hard: new Array(modeData.modes.length).map(() => false),
            foods: new Array(modeData.modes.length).map(() => false),
            dark: true,
            colorblind: false,
            tutorial: 3,
        };
    }
    function createDefaultStats(mode) {
        const stats = {
            played: 0,
            lastGame: 0,
            guesses: {
                fail: 0,
                1: 0,
                2: 0,
                3: 0,
                4: 0,
                5: 0,
                6: 0,
            }
        };
        if (!modeData.modes[mode].streak)
            return stats;
        return Object.assign(Object.assign({}, stats), { streak: 0, maxStreak: 0 });
    }
    function createLetterStates() {
        return {
            a: "🔳",
            b: "🔳",
            c: "🔳",
            d: "🔳",
            e: "🔳",
            f: "🔳",
            g: "🔳",
            h: "🔳",
            i: "🔳",
            j: "🔳",
            k: "🔳",
            l: "🔳",
            m: "🔳",
            n: "🔳",
            o: "🔳",
            p: "🔳",
            q: "🔳",
            r: "🔳",
            s: "🔳",
            t: "🔳",
            u: "🔳",
            v: "🔳",
            w: "🔳",
            x: "🔳",
            y: "🔳",
            z: "🔳",
        };
    }
    function timeRemaining(m) {
        if (m.useTimeZone) {
            return m.unit - (Date.now() - (m.seed + new Date().getTimezoneOffset() * ms.MINUTE));
        }
        return m.unit - (Date.now() - m.seed);
    }
    function failed(s) {
        return !(s.active || (s.guesses > 0 && s.board.state[s.guesses - 1].join("") === "🟩".repeat(COLS)));
    }

    function cubicOut(t) {
        const f = t - 1.0;
        return f * f * f + 1.0;
    }

    function fade(node, { delay = 0, duration = 400, easing = identity } = {}) {
        const o = +getComputedStyle(node).opacity;
        return {
            delay,
            duration,
            easing,
            css: t => `opacity: ${t * o}`
        };
    }
    function scale(node, { delay = 0, duration = 400, easing = cubicOut, start = 0, opacity = 0 } = {}) {
        const style = getComputedStyle(node);
        const target_opacity = +style.opacity;
        const transform = style.transform === 'none' ? '' : style.transform;
        const sd = 1 - start;
        const od = target_opacity * (1 - opacity);
        return {
            delay,
            duration,
            easing,
            css: (_t, u) => `
			transform: ${transform} scale(${1 - (sd * u)});
			opacity: ${target_opacity - (od * u)}
		`
        };
    }

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    const mode = writable();
    const letterStates = writable(createLetterStates());
    const settings = writable(createDefaultSettings());

    /* src\components\GameIcon.svelte generated by Svelte v3.46.4 */

    const file$r = "src\\components\\GameIcon.svelte";

    function create_fragment$t(ctx) {
    	let svg;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			if (default_slot) default_slot.c();
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "viewBox", "0 0 24 24");
    			attr_dev(svg, "class", "svelte-17ud64h");
    			add_location(svg, file$r, 3, 0, 64);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);

    			if (default_slot) {
    				default_slot.m(svg, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(
    					svg,
    					"click",
    					function () {
    						if (is_function(/*onClick*/ ctx[0])) /*onClick*/ ctx[0].apply(this, arguments);
    					},
    					false,
    					false,
    					false
    				);

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[1], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$t.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$t($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('GameIcon', slots, ['default']);

    	let { onClick = () => {
    		
    	} } = $$props;

    	const writable_props = ['onClick'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<GameIcon> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('onClick' in $$props) $$invalidate(0, onClick = $$props.onClick);
    		if ('$$scope' in $$props) $$invalidate(1, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ onClick });

    	$$self.$inject_state = $$props => {
    		if ('onClick' in $$props) $$invalidate(0, onClick = $$props.onClick);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [onClick, $$scope, slots];
    }

    class GameIcon extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$t, create_fragment$t, safe_not_equal, { onClick: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "GameIcon",
    			options,
    			id: create_fragment$t.name
    		});
    	}

    	get onClick() {
    		throw new Error("<GameIcon>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set onClick(value) {
    		throw new Error("<GameIcon>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\Header.svelte generated by Svelte v3.46.4 */
    const file$q = "src\\components\\Header.svelte";

    // (20:2) <GameIcon onClick={() => dispatch("tutorial")}>
    function create_default_slot_3$1(ctx) {
    	let path;

    	const block = {
    		c: function create() {
    			path = svg_element("path");
    			attr_dev(path, "d", "M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z");
    			add_location(path, file$q, 20, 3, 632);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, path, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(path);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3$1.name,
    		type: "slot",
    		source: "(20:2) <GameIcon onClick={() => dispatch(\\\"tutorial\\\")}>",
    		ctx
    	});

    	return block;
    }

    // (25:2) {#if showRefresh}
    function create_if_block_2$3(ctx) {
    	let gameicon;
    	let current;

    	gameicon = new GameIcon({
    			props: {
    				onClick: /*func_1*/ ctx[7],
    				$$slots: { default: [create_default_slot_2$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(gameicon.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(gameicon, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const gameicon_changes = {};

    			if (dirty & /*$$scope*/ 8192) {
    				gameicon_changes.$$scope = { dirty, ctx };
    			}

    			gameicon.$set(gameicon_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(gameicon.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(gameicon.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(gameicon, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$3.name,
    		type: "if",
    		source: "(25:2) {#if showRefresh}",
    		ctx
    	});

    	return block;
    }

    // (26:3) <GameIcon onClick={() => dispatch("reload")}>
    function create_default_slot_2$1(ctx) {
    	let path;
    	let path_transition;
    	let current;

    	const block = {
    		c: function create() {
    			path = svg_element("path");
    			attr_dev(path, "d", "M4.609 12c0-4.082 3.309-7.391 7.391-7.391a7.39 7.39 0 0 1 6.523 3.912l-1.653 1.567H22v-5.13l-1.572 1.659C18.652 3.841 15.542 2 12 2 6.477 2 2 6.477 2 12s4.477 10 10 10c4.589 0 8.453-3.09 9.631-7.301l-2.512-.703c-.871 3.113-3.73 5.395-7.119 5.395-4.082 0-7.391-3.309-7.391-7.391z");
    			add_location(path, file$q, 26, 4, 992);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, path, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (!path_transition) path_transition = create_bidirectional_transition(path, fade, { duration: 200 }, true);
    				path_transition.run(1);
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			if (!path_transition) path_transition = create_bidirectional_transition(path, fade, { duration: 200 }, false);
    			path_transition.run(0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(path);
    			if (detaching && path_transition) path_transition.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2$1.name,
    		type: "slot",
    		source: "(26:3) <GameIcon onClick={() => dispatch(\\\"reload\\\")}>",
    		ctx
    	});

    	return block;
    }

    // (46:2) {#if showStats}
    function create_if_block_1$3(ctx) {
    	let gameicon;
    	let current;

    	gameicon = new GameIcon({
    			props: {
    				onClick: /*func_2*/ ctx[10],
    				$$slots: { default: [create_default_slot_1$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(gameicon.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(gameicon, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const gameicon_changes = {};

    			if (dirty & /*$$scope*/ 8192) {
    				gameicon_changes.$$scope = { dirty, ctx };
    			}

    			gameicon.$set(gameicon_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(gameicon.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(gameicon.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(gameicon, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$3.name,
    		type: "if",
    		source: "(46:2) {#if showStats}",
    		ctx
    	});

    	return block;
    }

    // (47:3) <GameIcon onClick={() => dispatch("stats")}>
    function create_default_slot_1$2(ctx) {
    	let path;
    	let path_transition;
    	let current;

    	const block = {
    		c: function create() {
    			path = svg_element("path");
    			attr_dev(path, "d", "M16,11V3H8v6H2v12h20V11H16z M10,5h4v14h-4V5z M4,11h4v8H4V11z M20,19h-4v-6h4V19z");
    			add_location(path, file$q, 47, 4, 1808);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, path, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (!path_transition) path_transition = create_bidirectional_transition(path, fade, { duration: 200 }, true);
    				path_transition.run(1);
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			if (!path_transition) path_transition = create_bidirectional_transition(path, fade, { duration: 200 }, false);
    			path_transition.run(0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(path);
    			if (detaching && path_transition) path_transition.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$2.name,
    		type: "slot",
    		source: "(47:3) <GameIcon onClick={() => dispatch(\\\"stats\\\")}>",
    		ctx
    	});

    	return block;
    }

    // (53:2) <GameIcon onClick={() => dispatch("settings")}>
    function create_default_slot$4(ctx) {
    	let path;

    	const block = {
    		c: function create() {
    			path = svg_element("path");
    			attr_dev(path, "d", "M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z");
    			add_location(path, file$q, 53, 3, 2034);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, path, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(path);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$4.name,
    		type: "slot",
    		source: "(53:2) <GameIcon onClick={() => dispatch(\\\"settings\\\")}>",
    		ctx
    	});

    	return block;
    }

    // (58:1) {#if tutorial}
    function create_if_block$b(ctx) {
    	let div;
    	let t0;
    	let span;
    	let div_transition;
    	let current;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t0 = text("Tap Foodle to change game mode\r\n\t\t\t");
    			span = element("span");
    			span.textContent = "OK";
    			attr_dev(span, "class", "ok");
    			add_location(span, file$q, 60, 3, 3082);
    			attr_dev(div, "class", "tutorial");
    			add_location(div, file$q, 58, 2, 2960);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t0);
    			append_dev(div, span);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(div, "click", /*click_handler_1*/ ctx[12], false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (!div_transition) div_transition = create_bidirectional_transition(div, scale, {}, true);
    				div_transition.run(1);
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			if (!div_transition) div_transition = create_bidirectional_transition(div, scale, {}, false);
    			div_transition.run(0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (detaching && div_transition) div_transition.end();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$b.name,
    		type: "if",
    		source: "(58:1) {#if tutorial}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$s(ctx) {
    	let header;
    	let div0;
    	let gameicon0;
    	let t0;
    	let t1;
    	let h1;
    	let t3;
    	let div1;
    	let t4;
    	let gameicon1;
    	let t5;
    	let current;
    	let mounted;
    	let dispose;

    	gameicon0 = new GameIcon({
    			props: {
    				onClick: /*func*/ ctx[6],
    				$$slots: { default: [create_default_slot_3$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	let if_block0 = /*showRefresh*/ ctx[0] && create_if_block_2$3(ctx);
    	let if_block1 = /*showStats*/ ctx[1] && create_if_block_1$3(ctx);

    	gameicon1 = new GameIcon({
    			props: {
    				onClick: /*func_3*/ ctx[11],
    				$$slots: { default: [create_default_slot$4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	let if_block2 = /*tutorial*/ ctx[2] && create_if_block$b(ctx);

    	const block = {
    		c: function create() {
    			header = element("header");
    			div0 = element("div");
    			create_component(gameicon0.$$.fragment);
    			t0 = space();
    			if (if_block0) if_block0.c();
    			t1 = space();
    			h1 = element("h1");
    			h1.textContent = "Foodle";
    			t3 = space();
    			div1 = element("div");
    			if (if_block1) if_block1.c();
    			t4 = space();
    			create_component(gameicon1.$$.fragment);
    			t5 = space();
    			if (if_block2) if_block2.c();
    			attr_dev(div0, "class", "icons svelte-1p8q83t");
    			add_location(div0, file$q, 18, 0, 557);
    			attr_dev(h1, "id", "FoodleColor");
    			attr_dev(h1, "class", "svelte-1p8q83t");
    			add_location(h1, file$q, 32, 1, 1373);
    			attr_dev(div1, "class", "icons svelte-1p8q83t");
    			add_location(div1, file$q, 44, 1, 1715);
    			attr_dev(header, "class", "svelte-1p8q83t");
    			add_location(header, file$q, 16, 0, 545);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, header, anchor);
    			append_dev(header, div0);
    			mount_component(gameicon0, div0, null);
    			append_dev(div0, t0);
    			if (if_block0) if_block0.m(div0, null);
    			append_dev(header, t1);
    			append_dev(header, h1);
    			append_dev(header, t3);
    			append_dev(header, div1);
    			if (if_block1) if_block1.m(div1, null);
    			append_dev(div1, t4);
    			mount_component(gameicon1, div1, null);
    			append_dev(header, t5);
    			if (if_block2) if_block2.m(header, null);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(h1, "click", self$1(/*click_handler*/ ctx[8]), false, false, false),
    					listen_dev(h1, "contextmenu", self$1(prevent_default(/*contextmenu_handler*/ ctx[9])), false, true, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			const gameicon0_changes = {};

    			if (dirty & /*$$scope*/ 8192) {
    				gameicon0_changes.$$scope = { dirty, ctx };
    			}

    			gameicon0.$set(gameicon0_changes);

    			if (/*showRefresh*/ ctx[0]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);

    					if (dirty & /*showRefresh*/ 1) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_2$3(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(div0, null);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if (/*showStats*/ ctx[1]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty & /*showStats*/ 2) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block_1$3(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(div1, t4);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			const gameicon1_changes = {};

    			if (dirty & /*$$scope*/ 8192) {
    				gameicon1_changes.$$scope = { dirty, ctx };
    			}

    			gameicon1.$set(gameicon1_changes);

    			if (/*tutorial*/ ctx[2]) {
    				if (if_block2) {
    					if_block2.p(ctx, dirty);

    					if (dirty & /*tutorial*/ 4) {
    						transition_in(if_block2, 1);
    					}
    				} else {
    					if_block2 = create_if_block$b(ctx);
    					if_block2.c();
    					transition_in(if_block2, 1);
    					if_block2.m(header, null);
    				}
    			} else if (if_block2) {
    				group_outros();

    				transition_out(if_block2, 1, 1, () => {
    					if_block2 = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(gameicon0.$$.fragment, local);
    			transition_in(if_block0);
    			transition_in(if_block1);
    			transition_in(gameicon1.$$.fragment, local);
    			transition_in(if_block2);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(gameicon0.$$.fragment, local);
    			transition_out(if_block0);
    			transition_out(if_block1);
    			transition_out(gameicon1.$$.fragment, local);
    			transition_out(if_block2);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(header);
    			destroy_component(gameicon0);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			destroy_component(gameicon1);
    			if (if_block2) if_block2.d();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$s.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$s($$self, $$props, $$invalidate) {
    	let $mode;
    	validate_store(mode, 'mode');
    	component_subscribe($$self, mode, $$value => $$invalidate(4, $mode = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Header', slots, []);
    	let { showStats } = $$props;
    	let { tutorial } = $$props;
    	let { showRefresh } = $$props;
    	let { toaster = getContext("toaster") } = $$props;
    	const dispatch = createEventDispatcher();

    	mode.subscribe(m => {
    		if (timeRemaining(modeData.modes[m]) > 0) {
    			$$invalidate(0, showRefresh = false);
    		}
    	});

    	const writable_props = ['showStats', 'tutorial', 'showRefresh', 'toaster'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Header> was created with unknown prop '${key}'`);
    	});

    	const func = () => dispatch("tutorial");
    	const func_1 = () => dispatch("reload");

    	const click_handler = () => {
    		set_store_value(mode, $mode = ($mode + 1) % modeData.modes.length, $mode);
    		toaster.pop(modeData.modes[$mode].name);
    	};

    	const contextmenu_handler = () => {
    		set_store_value(mode, $mode = ($mode - 1 + modeData.modes.length) % modeData.modes.length, $mode);
    		toaster.pop(modeData.modes[$mode].name);
    	};

    	const func_2 = () => dispatch("stats");
    	const func_3 = () => dispatch("settings");
    	const click_handler_1 = () => dispatch("closeTutPopUp");

    	$$self.$$set = $$props => {
    		if ('showStats' in $$props) $$invalidate(1, showStats = $$props.showStats);
    		if ('tutorial' in $$props) $$invalidate(2, tutorial = $$props.tutorial);
    		if ('showRefresh' in $$props) $$invalidate(0, showRefresh = $$props.showRefresh);
    		if ('toaster' in $$props) $$invalidate(3, toaster = $$props.toaster);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		getContext,
    		scale,
    		fade,
    		mode,
    		modeData,
    		timeRemaining,
    		GameIcon,
    		showStats,
    		tutorial,
    		showRefresh,
    		toaster,
    		dispatch,
    		$mode
    	});

    	$$self.$inject_state = $$props => {
    		if ('showStats' in $$props) $$invalidate(1, showStats = $$props.showStats);
    		if ('tutorial' in $$props) $$invalidate(2, tutorial = $$props.tutorial);
    		if ('showRefresh' in $$props) $$invalidate(0, showRefresh = $$props.showRefresh);
    		if ('toaster' in $$props) $$invalidate(3, toaster = $$props.toaster);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		showRefresh,
    		showStats,
    		tutorial,
    		toaster,
    		$mode,
    		dispatch,
    		func,
    		func_1,
    		click_handler,
    		contextmenu_handler,
    		func_2,
    		func_3,
    		click_handler_1
    	];
    }

    class Header extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init$1(this, options, instance$s, create_fragment$s, safe_not_equal, {
    			showStats: 1,
    			tutorial: 2,
    			showRefresh: 0,
    			toaster: 3
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Header",
    			options,
    			id: create_fragment$s.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*showStats*/ ctx[1] === undefined && !('showStats' in props)) {
    			console.warn("<Header> was created without expected prop 'showStats'");
    		}

    		if (/*tutorial*/ ctx[2] === undefined && !('tutorial' in props)) {
    			console.warn("<Header> was created without expected prop 'tutorial'");
    		}

    		if (/*showRefresh*/ ctx[0] === undefined && !('showRefresh' in props)) {
    			console.warn("<Header> was created without expected prop 'showRefresh'");
    		}
    	}

    	get showStats() {
    		throw new Error("<Header>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set showStats(value) {
    		throw new Error("<Header>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get tutorial() {
    		throw new Error("<Header>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set tutorial(value) {
    		throw new Error("<Header>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get showRefresh() {
    		throw new Error("<Header>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set showRefresh(value) {
    		throw new Error("<Header>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get toaster() {
    		throw new Error("<Header>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set toaster(value) {
    		throw new Error("<Header>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\board\Tile.svelte generated by Svelte v3.46.4 */
    const file$p = "src\\components\\board\\Tile.svelte";

    function create_fragment$r(ctx) {
    	let div2;
    	let div0;
    	let t0;
    	let t1;
    	let div1;
    	let t2;
    	let div2_class_value;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			t0 = text(/*value*/ ctx[0]);
    			t1 = space();
    			div1 = element("div");
    			t2 = text(/*value*/ ctx[0]);
    			attr_dev(div0, "class", "front svelte-frmspd");
    			add_location(div0, file$p, 32, 1, 971);
    			attr_dev(div1, "class", "back svelte-frmspd");
    			add_location(div1, file$p, 33, 1, 1006);
    			attr_dev(div2, "data-animation", /*animation*/ ctx[5]);
    			attr_dev(div2, "class", div2_class_value = "tile " + /*state*/ ctx[1] + " " + /*s*/ ctx[3] + " svelte-frmspd");
    			set_style(div2, "transition-delay", /*position*/ ctx[2] * DELAY_INCREMENT + "ms");
    			toggle_class(div2, "value", /*value*/ ctx[0]);
    			toggle_class(div2, "pop", /*pop*/ ctx[4]);
    			add_location(div2, file$p, 25, 0, 820);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div0, t0);
    			append_dev(div2, t1);
    			append_dev(div2, div1);
    			append_dev(div1, t2);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*value*/ 1) set_data_dev(t0, /*value*/ ctx[0]);
    			if (dirty & /*value*/ 1) set_data_dev(t2, /*value*/ ctx[0]);

    			if (dirty & /*animation*/ 32) {
    				attr_dev(div2, "data-animation", /*animation*/ ctx[5]);
    			}

    			if (dirty & /*state, s*/ 10 && div2_class_value !== (div2_class_value = "tile " + /*state*/ ctx[1] + " " + /*s*/ ctx[3] + " svelte-frmspd")) {
    				attr_dev(div2, "class", div2_class_value);
    			}

    			if (dirty & /*position*/ 4) {
    				set_style(div2, "transition-delay", /*position*/ ctx[2] * DELAY_INCREMENT + "ms");
    			}

    			if (dirty & /*state, s, value*/ 11) {
    				toggle_class(div2, "value", /*value*/ ctx[0]);
    			}

    			if (dirty & /*state, s, pop*/ 26) {
    				toggle_class(div2, "pop", /*pop*/ ctx[4]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$r.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$r($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Tile', slots, []);
    	let { value = "" } = $$props;
    	let { state } = $$props;
    	let { position = 0 } = $$props;

    	function bounce() {
    		setTimeout(() => $$invalidate(5, animation = "bounce"), (ROWS + position) * DELAY_INCREMENT);
    	}

    	let s;
    	let pop = false;
    	let animation = "";

    	// ensure all animations play
    	const unsub = mode.subscribe(() => {
    		$$invalidate(5, animation = "");
    		$$invalidate(3, s = "🔳");
    		setTimeout(() => $$invalidate(3, s = ""), 10);
    	});

    	// prevent pop animation from playing at the beginning
    	setTimeout(() => $$invalidate(4, pop = true), 200);

    	onDestroy(unsub);
    	const writable_props = ['value', 'state', 'position'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Tile> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('value' in $$props) $$invalidate(0, value = $$props.value);
    		if ('state' in $$props) $$invalidate(1, state = $$props.state);
    		if ('position' in $$props) $$invalidate(2, position = $$props.position);
    	};

    	$$self.$capture_state = () => ({
    		onDestroy,
    		mode,
    		DELAY_INCREMENT,
    		ROWS,
    		value,
    		state,
    		position,
    		bounce,
    		s,
    		pop,
    		animation,
    		unsub
    	});

    	$$self.$inject_state = $$props => {
    		if ('value' in $$props) $$invalidate(0, value = $$props.value);
    		if ('state' in $$props) $$invalidate(1, state = $$props.state);
    		if ('position' in $$props) $$invalidate(2, position = $$props.position);
    		if ('s' in $$props) $$invalidate(3, s = $$props.s);
    		if ('pop' in $$props) $$invalidate(4, pop = $$props.pop);
    		if ('animation' in $$props) $$invalidate(5, animation = $$props.animation);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*value*/ 1) {
    			// reset animation when value changes, because for some reason changing anination to "" when the game is over causes the tiles to flash
    			!value && $$invalidate(5, animation = "");
    		}
    	};

    	return [value, state, position, s, pop, animation, bounce];
    }

    class Tile extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init$1(this, options, instance$r, create_fragment$r, safe_not_equal, {
    			value: 0,
    			state: 1,
    			position: 2,
    			bounce: 6
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Tile",
    			options,
    			id: create_fragment$r.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*state*/ ctx[1] === undefined && !('state' in props)) {
    			console.warn("<Tile> was created without expected prop 'state'");
    		}
    	}

    	get value() {
    		throw new Error("<Tile>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<Tile>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get state() {
    		throw new Error("<Tile>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set state(value) {
    		throw new Error("<Tile>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get position() {
    		throw new Error("<Tile>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set position(value) {
    		throw new Error("<Tile>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get bounce() {
    		return this.$$.ctx[6];
    	}

    	set bounce(value) {
    		throw new Error("<Tile>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\board\Row.svelte generated by Svelte v3.46.4 */
    const file$o = "src\\components\\board\\Row.svelte";

    function get_each_context$9(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[13] = list[i];
    	child_ctx[14] = list;
    	child_ctx[15] = i;
    	return child_ctx;
    }

    // (27:1) {#each Array(COLS) as _, i}
    function create_each_block$9(ctx) {
    	let tile;
    	let i = /*i*/ ctx[15];
    	let current;
    	const assign_tile = () => /*tile_binding*/ ctx[9](tile, i);
    	const unassign_tile = () => /*tile_binding*/ ctx[9](null, i);

    	let tile_props = {
    		state: /*state*/ ctx[3][/*i*/ ctx[15]],
    		value: /*value*/ ctx[2].charAt(/*i*/ ctx[15]),
    		position: /*i*/ ctx[15]
    	};

    	tile = new Tile({ props: tile_props, $$inline: true });
    	assign_tile();

    	const block = {
    		c: function create() {
    			create_component(tile.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(tile, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (i !== /*i*/ ctx[15]) {
    				unassign_tile();
    				i = /*i*/ ctx[15];
    				assign_tile();
    			}

    			const tile_changes = {};
    			if (dirty & /*state*/ 8) tile_changes.state = /*state*/ ctx[3][/*i*/ ctx[15]];
    			if (dirty & /*value*/ 4) tile_changes.value = /*value*/ ctx[2].charAt(/*i*/ ctx[15]);
    			tile.$set(tile_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(tile.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(tile.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			unassign_tile();
    			destroy_component(tile, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$9.name,
    		type: "each",
    		source: "(27:1) {#each Array(COLS) as _, i}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$q(ctx) {
    	let div;
    	let current;
    	let mounted;
    	let dispose;
    	let each_value = Array(COLS);
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$9(get_each_context$9(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", "board-row svelte-ssibky");
    			attr_dev(div, "data-animation", /*animation*/ ctx[4]);
    			toggle_class(div, "complete", /*guesses*/ ctx[0] > /*num*/ ctx[1]);
    			add_location(div, file$o, 18, 0, 440);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(div, "contextmenu", prevent_default(/*contextmenu_handler*/ ctx[10]), false, true, false),
    					listen_dev(div, "dblclick", prevent_default(/*dblclick_handler*/ ctx[11]), false, true, false),
    					listen_dev(div, "animationend", /*animationend_handler*/ ctx[12], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*state, value, tiles*/ 44) {
    				each_value = Array(COLS);
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$9(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$9(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}

    			if (!current || dirty & /*animation*/ 16) {
    				attr_dev(div, "data-animation", /*animation*/ ctx[4]);
    			}

    			if (dirty & /*guesses, num*/ 3) {
    				toggle_class(div, "complete", /*guesses*/ ctx[0] > /*num*/ ctx[1]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$q.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$q($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Row', slots, []);
    	let { guesses } = $$props;
    	let { num } = $$props;
    	let { value = "" } = $$props;
    	let { state } = $$props;

    	function shake() {
    		$$invalidate(4, animation = "shake");
    	}

    	function bounce() {
    		tiles.forEach(e => e.bounce());
    	}

    	const dispatch = createEventDispatcher();
    	let animation = "";
    	let tiles = [];
    	const writable_props = ['guesses', 'num', 'value', 'state'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Row> was created with unknown prop '${key}'`);
    	});

    	function tile_binding($$value, i) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			tiles[i] = $$value;
    			$$invalidate(5, tiles);
    		});
    	}

    	const contextmenu_handler = e => dispatch("ctx", { x: e.clientX, y: e.clientY });
    	const dblclick_handler = e => dispatch("ctx", { x: e.clientX, y: e.clientY });
    	const animationend_handler = () => $$invalidate(4, animation = "");

    	$$self.$$set = $$props => {
    		if ('guesses' in $$props) $$invalidate(0, guesses = $$props.guesses);
    		if ('num' in $$props) $$invalidate(1, num = $$props.num);
    		if ('value' in $$props) $$invalidate(2, value = $$props.value);
    		if ('state' in $$props) $$invalidate(3, state = $$props.state);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		COLS,
    		Tile,
    		guesses,
    		num,
    		value,
    		state,
    		shake,
    		bounce,
    		dispatch,
    		animation,
    		tiles
    	});

    	$$self.$inject_state = $$props => {
    		if ('guesses' in $$props) $$invalidate(0, guesses = $$props.guesses);
    		if ('num' in $$props) $$invalidate(1, num = $$props.num);
    		if ('value' in $$props) $$invalidate(2, value = $$props.value);
    		if ('state' in $$props) $$invalidate(3, state = $$props.state);
    		if ('animation' in $$props) $$invalidate(4, animation = $$props.animation);
    		if ('tiles' in $$props) $$invalidate(5, tiles = $$props.tiles);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		guesses,
    		num,
    		value,
    		state,
    		animation,
    		tiles,
    		dispatch,
    		shake,
    		bounce,
    		tile_binding,
    		contextmenu_handler,
    		dblclick_handler,
    		animationend_handler
    	];
    }

    class Row extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init$1(this, options, instance$q, create_fragment$q, safe_not_equal, {
    			guesses: 0,
    			num: 1,
    			value: 2,
    			state: 3,
    			shake: 7,
    			bounce: 8
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Row",
    			options,
    			id: create_fragment$q.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*guesses*/ ctx[0] === undefined && !('guesses' in props)) {
    			console.warn("<Row> was created without expected prop 'guesses'");
    		}

    		if (/*num*/ ctx[1] === undefined && !('num' in props)) {
    			console.warn("<Row> was created without expected prop 'num'");
    		}

    		if (/*state*/ ctx[3] === undefined && !('state' in props)) {
    			console.warn("<Row> was created without expected prop 'state'");
    		}
    	}

    	get guesses() {
    		throw new Error("<Row>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set guesses(value) {
    		throw new Error("<Row>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get num() {
    		throw new Error("<Row>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set num(value) {
    		throw new Error("<Row>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get value() {
    		throw new Error("<Row>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<Row>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get state() {
    		throw new Error("<Row>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set state(value) {
    		throw new Error("<Row>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get shake() {
    		return this.$$.ctx[7];
    	}

    	set shake(value) {
    		throw new Error("<Row>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get bounce() {
    		return this.$$.ctx[8];
    	}

    	set bounce(value) {
    		throw new Error("<Row>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\widgets\Definition.svelte generated by Svelte v3.46.4 */

    const { Error: Error_1$2 } = globals;
    const file$n = "src\\components\\widgets\\Definition.svelte";

    function get_each_context$8(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[3] = list[i];
    	return child_ctx;
    }

    // (36:1) {:catch}
    function create_catch_block$1(ctx) {
    	let div;
    	let t0;
    	let strong;
    	let t1;
    	let t2;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t0 = text("Your word was ");
    			strong = element("strong");
    			t1 = text(/*word*/ ctx[0]);
    			t2 = text(". (failed to fetch definition)");
    			add_location(strong, file$n, 36, 21, 1060);
    			add_location(div, file$n, 36, 2, 1041);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t0);
    			append_dev(div, strong);
    			append_dev(strong, t1);
    			append_dev(div, t2);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*word*/ 1) set_data_dev(t1, /*word*/ ctx[0]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_catch_block$1.name,
    		type: "catch",
    		source: "(36:1) {:catch}",
    		ctx
    	});

    	return block;
    }

    // (25:1) {:then data}
    function create_then_block$1(ctx) {
    	let h2;
    	let t0;
    	let t1;
    	let em;
    	let t2_value = /*data*/ ctx[2].meanings[0].partOfSpeech + "";
    	let t2;
    	let t3;
    	let ol;
    	let t4;
    	let if_block = /*word*/ ctx[0] !== /*data*/ ctx[2].word && create_if_block$a(ctx);
    	let each_value = /*data*/ ctx[2].meanings[0].definitions.slice(0, 1 + /*alternates*/ ctx[1] - (/*word*/ ctx[0] !== /*data*/ ctx[2].word ? 1 : 0));
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$8(get_each_context$8(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			t0 = text(/*word*/ ctx[0]);
    			t1 = space();
    			em = element("em");
    			t2 = text(t2_value);
    			t3 = space();
    			ol = element("ol");
    			if (if_block) if_block.c();
    			t4 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(h2, "class", "svelte-r8gslp");
    			add_location(h2, file$n, 25, 2, 726);
    			add_location(em, file$n, 26, 2, 745);
    			attr_dev(ol, "class", "svelte-r8gslp");
    			add_location(ol, file$n, 27, 2, 789);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    			append_dev(h2, t0);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, em, anchor);
    			append_dev(em, t2);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, ol, anchor);
    			if (if_block) if_block.m(ol, null);
    			append_dev(ol, t4);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ol, null);
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*word*/ 1) set_data_dev(t0, /*word*/ ctx[0]);
    			if (dirty & /*word*/ 1 && t2_value !== (t2_value = /*data*/ ctx[2].meanings[0].partOfSpeech + "")) set_data_dev(t2, t2_value);

    			if (/*word*/ ctx[0] !== /*data*/ ctx[2].word) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$a(ctx);
    					if_block.c();
    					if_block.m(ol, t4);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty & /*getWordData, word, alternates*/ 3) {
    				each_value = /*data*/ ctx[2].meanings[0].definitions.slice(0, 1 + /*alternates*/ ctx[1] - (/*word*/ ctx[0] !== /*data*/ ctx[2].word ? 1 : 0));
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$8(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$8(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ol, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(em);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(ol);
    			if (if_block) if_block.d();
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_then_block$1.name,
    		type: "then",
    		source: "(25:1) {:then data}",
    		ctx
    	});

    	return block;
    }

    // (29:3) {#if word !== data.word}
    function create_if_block$a(ctx) {
    	let li;
    	let t0;
    	let t1_value = /*data*/ ctx[2].word + "";
    	let t1;
    	let t2;

    	const block = {
    		c: function create() {
    			li = element("li");
    			t0 = text("variant of ");
    			t1 = text(t1_value);
    			t2 = text(".");
    			attr_dev(li, "class", "svelte-r8gslp");
    			add_location(li, file$n, 29, 4, 828);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, t0);
    			append_dev(li, t1);
    			append_dev(li, t2);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*word*/ 1 && t1_value !== (t1_value = /*data*/ ctx[2].word + "")) set_data_dev(t1, t1_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$a.name,
    		type: "if",
    		source: "(29:3) {#if word !== data.word}",
    		ctx
    	});

    	return block;
    }

    // (32:3) {#each data.meanings[0].definitions.slice(0, 1 + alternates - (word !== data.word ? 1 : 0)) as def}
    function create_each_block$8(ctx) {
    	let li;
    	let t_value = /*def*/ ctx[3].definition + "";
    	let t;

    	const block = {
    		c: function create() {
    			li = element("li");
    			t = text(t_value);
    			attr_dev(li, "class", "svelte-r8gslp");
    			add_location(li, file$n, 32, 4, 980);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*word, alternates*/ 3 && t_value !== (t_value = /*def*/ ctx[3].definition + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$8.name,
    		type: "each",
    		source: "(32:3) {#each data.meanings[0].definitions.slice(0, 1 + alternates - (word !== data.word ? 1 : 0)) as def}",
    		ctx
    	});

    	return block;
    }

    // (23:27)     <h4>Fetching definition...</h4>   {:then data}
    function create_pending_block$1(ctx) {
    	let h4;

    	const block = {
    		c: function create() {
    			h4 = element("h4");
    			h4.textContent = "Fetching definition...";
    			add_location(h4, file$n, 23, 2, 676);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h4, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h4);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_pending_block$1.name,
    		type: "pending",
    		source: "(23:27)     <h4>Fetching definition...</h4>   {:then data}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$p(ctx) {
    	let div;
    	let promise;

    	let info = {
    		ctx,
    		current: null,
    		token: null,
    		hasCatch: true,
    		pending: create_pending_block$1,
    		then: create_then_block$1,
    		catch: create_catch_block$1,
    		value: 2
    	};

    	handle_promise(promise = getWordData(/*word*/ ctx[0]), info);

    	const block = {
    		c: function create() {
    			div = element("div");
    			info.block.c();
    			attr_dev(div, "class", "def");
    			add_location(div, file$n, 21, 0, 626);
    		},
    		l: function claim(nodes) {
    			throw new Error_1$2("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			info.block.m(div, info.anchor = null);
    			info.mount = () => div;
    			info.anchor = null;
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;
    			info.ctx = ctx;

    			if (dirty & /*word*/ 1 && promise !== (promise = getWordData(/*word*/ ctx[0])) && handle_promise(promise, info)) ; else {
    				update_await_block_branch(info, ctx, dirty);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			info.block.d();
    			info.token = null;
    			info = null;
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$p.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const cache = new Map();

    async function getWordData(word) {
    	if (!cache.has(word)) {
    		const data = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, { mode: "cors" });

    		if (data.ok) {
    			cache.set(word, (await data.json())[0]);
    		} else {
    			throw new Error(`Failed to fetch definition`);
    		}
    	}

    	return cache.get(word);
    }

    function instance$p($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Definition', slots, []);
    	let { word } = $$props;
    	let { alternates = 9 } = $$props;
    	const writable_props = ['word', 'alternates'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Definition> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('word' in $$props) $$invalidate(0, word = $$props.word);
    		if ('alternates' in $$props) $$invalidate(1, alternates = $$props.alternates);
    	};

    	$$self.$capture_state = () => ({ cache, word, alternates, getWordData });

    	$$self.$inject_state = $$props => {
    		if ('word' in $$props) $$invalidate(0, word = $$props.word);
    		if ('alternates' in $$props) $$invalidate(1, alternates = $$props.alternates);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [word, alternates];
    }

    class Definition extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$p, create_fragment$p, safe_not_equal, { word: 0, alternates: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Definition",
    			options,
    			id: create_fragment$p.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*word*/ ctx[0] === undefined && !('word' in props)) {
    			console.warn("<Definition> was created without expected prop 'word'");
    		}
    	}

    	get word() {
    		throw new Error_1$2("<Definition>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set word(value) {
    		throw new Error_1$2("<Definition>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get alternates() {
    		throw new Error_1$2("<Definition>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set alternates(value) {
    		throw new Error_1$2("<Definition>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\widgets\ContextMenu.svelte generated by Svelte v3.46.4 */
    const file$m = "src\\components\\widgets\\ContextMenu.svelte";

    // (21:1) {:else}
    function create_else_block$3(ctx) {
    	let div;
    	let t0;
    	let t1_value = (/*pAns*/ ctx[3] > 1 ? "are" : "is") + "";
    	let t1;
    	let t2;
    	let br0;
    	let br1;
    	let t3;
    	let t4;
    	let t5;
    	let t6_value = (/*pAns*/ ctx[3] > 1 ? "s" : "") + "";
    	let t6;
    	let t7;
    	let br2;
    	let t8;
    	let t9;
    	let t10;
    	let t11_value = (/*pSols*/ ctx[4] > 1 ? "es" : "") + "";
    	let t11;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t0 = text("Considering all hints, there ");
    			t1 = text(t1_value);
    			t2 = text(":\r\n\t\t\t");
    			br0 = element("br");
    			br1 = element("br");
    			t3 = space();
    			t4 = text(/*pAns*/ ctx[3]);
    			t5 = text(" possible answer");
    			t6 = text(t6_value);
    			t7 = space();
    			br2 = element("br");
    			t8 = space();
    			t9 = text(/*pSols*/ ctx[4]);
    			t10 = text(" valid guess");
    			t11 = text(t11_value);
    			add_location(br0, file$m, 23, 3, 724);
    			add_location(br1, file$m, 23, 9, 730);
    			add_location(br2, file$m, 25, 3, 789);
    			add_location(div, file$m, 21, 2, 654);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t0);
    			append_dev(div, t1);
    			append_dev(div, t2);
    			append_dev(div, br0);
    			append_dev(div, br1);
    			append_dev(div, t3);
    			append_dev(div, t4);
    			append_dev(div, t5);
    			append_dev(div, t6);
    			append_dev(div, t7);
    			append_dev(div, br2);
    			append_dev(div, t8);
    			append_dev(div, t9);
    			append_dev(div, t10);
    			append_dev(div, t11);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*pAns*/ 8 && t1_value !== (t1_value = (/*pAns*/ ctx[3] > 1 ? "are" : "is") + "")) set_data_dev(t1, t1_value);
    			if (dirty & /*pAns*/ 8) set_data_dev(t4, /*pAns*/ ctx[3]);
    			if (dirty & /*pAns*/ 8 && t6_value !== (t6_value = (/*pAns*/ ctx[3] > 1 ? "s" : "") + "")) set_data_dev(t6, t6_value);
    			if (dirty & /*pSols*/ 16) set_data_dev(t9, /*pSols*/ ctx[4]);
    			if (dirty & /*pSols*/ 16 && t11_value !== (t11_value = (/*pSols*/ ctx[4] > 1 ? "es" : "") + "")) set_data_dev(t11, t11_value);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$3.name,
    		type: "else",
    		source: "(21:1) {:else}",
    		ctx
    	});

    	return block;
    }

    // (12:1) {#if word !== ""}
    function create_if_block$9(ctx) {
    	let div;
    	let t0;
    	let br0;
    	let br1;
    	let t1;
    	let t2;
    	let t3;
    	let t4_value = (/*pAns*/ ctx[3] > 1 ? "s" : "") + "";
    	let t4;
    	let t5;
    	let br2;
    	let t6;
    	let t7;
    	let t8;
    	let t9_value = (/*pSols*/ ctx[4] > 1 ? "es" : "") + "";
    	let t9;
    	let t10;
    	let definition;
    	let current;

    	definition = new Definition({
    			props: { word: /*word*/ ctx[2], alternates: 1 },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			t0 = text("Considering all hints, this row had:\r\n\t\t\t");
    			br0 = element("br");
    			br1 = element("br");
    			t1 = space();
    			t2 = text(/*pAns*/ ctx[3]);
    			t3 = text(" possible answer");
    			t4 = text(t4_value);
    			t5 = space();
    			br2 = element("br");
    			t6 = space();
    			t7 = text(/*pSols*/ ctx[4]);
    			t8 = text(" valid guess");
    			t9 = text(t9_value);
    			t10 = space();
    			create_component(definition.$$.fragment);
    			add_location(br0, file$m, 14, 3, 472);
    			add_location(br1, file$m, 14, 9, 478);
    			add_location(br2, file$m, 16, 3, 537);
    			add_location(div, file$m, 12, 2, 421);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t0);
    			append_dev(div, br0);
    			append_dev(div, br1);
    			append_dev(div, t1);
    			append_dev(div, t2);
    			append_dev(div, t3);
    			append_dev(div, t4);
    			append_dev(div, t5);
    			append_dev(div, br2);
    			append_dev(div, t6);
    			append_dev(div, t7);
    			append_dev(div, t8);
    			append_dev(div, t9);
    			insert_dev(target, t10, anchor);
    			mount_component(definition, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (!current || dirty & /*pAns*/ 8) set_data_dev(t2, /*pAns*/ ctx[3]);
    			if ((!current || dirty & /*pAns*/ 8) && t4_value !== (t4_value = (/*pAns*/ ctx[3] > 1 ? "s" : "") + "")) set_data_dev(t4, t4_value);
    			if (!current || dirty & /*pSols*/ 16) set_data_dev(t7, /*pSols*/ ctx[4]);
    			if ((!current || dirty & /*pSols*/ 16) && t9_value !== (t9_value = (/*pSols*/ ctx[4] > 1 ? "es" : "") + "")) set_data_dev(t9, t9_value);
    			const definition_changes = {};
    			if (dirty & /*word*/ 4) definition_changes.word = /*word*/ ctx[2];
    			definition.$set(definition_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(definition.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(definition.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (detaching) detach_dev(t10);
    			destroy_component(definition, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$9.name,
    		type: "if",
    		source: "(12:1) {#if word !== \\\"\\\"}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$o(ctx) {
    	let div;
    	let current_block_type_index;
    	let if_block;
    	let current;
    	const if_block_creators = [create_if_block$9, create_else_block$3];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*word*/ ctx[2] !== "") return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if_block.c();
    			attr_dev(div, "class", "ctx-menu svelte-uw0qlf");
    			set_style(div, "top", /*y*/ ctx[1] + "px");
    			set_style(div, "left", /*x*/ ctx[0] + "px");
    			add_location(div, file$m, 10, 0, 342);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if_blocks[current_block_type_index].m(div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(div, null);
    			}

    			if (!current || dirty & /*y*/ 2) {
    				set_style(div, "top", /*y*/ ctx[1] + "px");
    			}

    			if (!current || dirty & /*x*/ 1) {
    				set_style(div, "left", /*x*/ ctx[0] + "px");
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if_blocks[current_block_type_index].d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$o.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$o($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ContextMenu', slots, []);
    	let { x = 0 } = $$props;
    	let { y = 0 } = $$props;
    	let { word = "" } = $$props;
    	let { pAns } = $$props;
    	let { pSols } = $$props;
    	const width = parseInt(getComputedStyle(document.body).getPropertyValue("--game-width")) / 2;
    	const writable_props = ['x', 'y', 'word', 'pAns', 'pSols'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ContextMenu> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('x' in $$props) $$invalidate(0, x = $$props.x);
    		if ('y' in $$props) $$invalidate(1, y = $$props.y);
    		if ('word' in $$props) $$invalidate(2, word = $$props.word);
    		if ('pAns' in $$props) $$invalidate(3, pAns = $$props.pAns);
    		if ('pSols' in $$props) $$invalidate(4, pSols = $$props.pSols);
    	};

    	$$self.$capture_state = () => ({
    		Definition,
    		x,
    		y,
    		word,
    		pAns,
    		pSols,
    		width
    	});

    	$$self.$inject_state = $$props => {
    		if ('x' in $$props) $$invalidate(0, x = $$props.x);
    		if ('y' in $$props) $$invalidate(1, y = $$props.y);
    		if ('word' in $$props) $$invalidate(2, word = $$props.word);
    		if ('pAns' in $$props) $$invalidate(3, pAns = $$props.pAns);
    		if ('pSols' in $$props) $$invalidate(4, pSols = $$props.pSols);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*x*/ 1) {
    			$$invalidate(0, x = window.innerWidth - x < width
    			? window.innerWidth - width
    			: x);
    		}
    	};

    	return [x, y, word, pAns, pSols];
    }

    class ContextMenu extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$o, create_fragment$o, safe_not_equal, { x: 0, y: 1, word: 2, pAns: 3, pSols: 4 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ContextMenu",
    			options,
    			id: create_fragment$o.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*pAns*/ ctx[3] === undefined && !('pAns' in props)) {
    			console.warn("<ContextMenu> was created without expected prop 'pAns'");
    		}

    		if (/*pSols*/ ctx[4] === undefined && !('pSols' in props)) {
    			console.warn("<ContextMenu> was created without expected prop 'pSols'");
    		}
    	}

    	get x() {
    		throw new Error("<ContextMenu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set x(value) {
    		throw new Error("<ContextMenu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get y() {
    		throw new Error("<ContextMenu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set y(value) {
    		throw new Error("<ContextMenu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get word() {
    		throw new Error("<ContextMenu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set word(value) {
    		throw new Error("<ContextMenu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get pAns() {
    		throw new Error("<ContextMenu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set pAns(value) {
    		throw new Error("<ContextMenu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get pSols() {
    		throw new Error("<ContextMenu>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set pSols(value) {
    		throw new Error("<ContextMenu>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\board\Board.svelte generated by Svelte v3.46.4 */
    const file$l = "src\\components\\board\\Board.svelte";

    function get_each_context$7(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[22] = list[i];
    	child_ctx[23] = list;
    	child_ctx[24] = i;
    	return child_ctx;
    }

    // (43:0) {#if showCtx}
    function create_if_block_2$2(ctx) {
    	let contextmenu;
    	let current;

    	contextmenu = new ContextMenu({
    			props: {
    				pAns: /*pAns*/ ctx[7],
    				pSols: /*pSols*/ ctx[8],
    				x: /*x*/ ctx[9],
    				y: /*y*/ ctx[10],
    				word: /*word*/ ctx[11]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(contextmenu.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(contextmenu, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const contextmenu_changes = {};
    			if (dirty & /*pAns*/ 128) contextmenu_changes.pAns = /*pAns*/ ctx[7];
    			if (dirty & /*pSols*/ 256) contextmenu_changes.pSols = /*pSols*/ ctx[8];
    			if (dirty & /*x*/ 512) contextmenu_changes.x = /*x*/ ctx[9];
    			if (dirty & /*y*/ 1024) contextmenu_changes.y = /*y*/ ctx[10];
    			if (dirty & /*word*/ 2048) contextmenu_changes.word = /*word*/ ctx[11];
    			contextmenu.$set(contextmenu_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(contextmenu.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(contextmenu.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(contextmenu, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$2.name,
    		type: "if",
    		source: "(43:0) {#if showCtx}",
    		ctx
    	});

    	return block;
    }

    // (48:4) {#each value as _, i}
    function create_each_block$7(ctx) {
    	let row;
    	let i = /*i*/ ctx[24];
    	let updating_value;
    	let current;
    	const assign_row = () => /*row_binding*/ ctx[17](row, i);
    	const unassign_row = () => /*row_binding*/ ctx[17](null, i);

    	function row_value_binding(value) {
    		/*row_value_binding*/ ctx[18](value, /*i*/ ctx[24]);
    	}

    	function ctx_handler(...args) {
    		return /*ctx_handler*/ ctx[19](/*i*/ ctx[24], ...args);
    	}

    	let row_props = {
    		num: /*i*/ ctx[24],
    		guesses: /*guesses*/ ctx[2],
    		state: /*board*/ ctx[1].state[/*i*/ ctx[24]]
    	};

    	if (/*value*/ ctx[0][/*i*/ ctx[24]] !== void 0) {
    		row_props.value = /*value*/ ctx[0][/*i*/ ctx[24]];
    	}

    	row = new Row({ props: row_props, $$inline: true });
    	assign_row();
    	binding_callbacks.push(() => bind(row, 'value', row_value_binding));
    	row.$on("ctx", ctx_handler);

    	const block = {
    		c: function create() {
    			create_component(row.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(row, target, anchor);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (i !== /*i*/ ctx[24]) {
    				unassign_row();
    				i = /*i*/ ctx[24];
    				assign_row();
    			}

    			const row_changes = {};
    			if (dirty & /*guesses*/ 4) row_changes.guesses = /*guesses*/ ctx[2];
    			if (dirty & /*board*/ 2) row_changes.state = /*board*/ ctx[1].state[/*i*/ ctx[24]];

    			if (!updating_value && dirty & /*value*/ 1) {
    				updating_value = true;
    				row_changes.value = /*value*/ ctx[0][/*i*/ ctx[24]];
    				add_flush_callback(() => updating_value = false);
    			}

    			row.$set(row_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(row.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(row.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			unassign_row();
    			destroy_component(row, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$7.name,
    		type: "each",
    		source: "(48:4) {#each value as _, i}",
    		ctx
    	});

    	return block;
    }

    // (58:4) {#if icon}
    function create_if_block_1$2(ctx) {
    	let svg;
    	let path;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			path = svg_element("path");
    			attr_dev(path, "d", /*icon*/ ctx[3]);
    			attr_dev(path, "stroke-width", "14");
    			attr_dev(path, "class", "svelte-19g44m0");
    			add_location(path, file$l, 59, 12, 1638);
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "viewBox", "0 0 200 200");
    			attr_dev(svg, "fill", "none");
    			attr_dev(svg, "class", "svelte-19g44m0");
    			add_location(svg, file$l, 58, 8, 1550);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, path);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*icon*/ 8) {
    				attr_dev(path, "d", /*icon*/ ctx[3]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$2.name,
    		type: "if",
    		source: "(58:4) {#if icon}",
    		ctx
    	});

    	return block;
    }

    // (63:4) {#if tutorial}
    function create_if_block$8(ctx) {
    	let div;
    	let t0;
    	let span;
    	let div_transition;
    	let current;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t0 = text("double tap (right click) a row to see a word's definition, or how many words could be\r\n            played there\r\n            ");
    			span = element("span");
    			span.textContent = "OK";
    			attr_dev(span, "class", "ok");
    			add_location(span, file$l, 66, 12, 1950);
    			attr_dev(div, "class", "tutorial svelte-19g44m0");
    			add_location(div, file$l, 63, 8, 1729);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t0);
    			append_dev(div, span);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(div, "click", /*click_handler*/ ctx[20], false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (!div_transition) div_transition = create_bidirectional_transition(div, scale, {}, true);
    				div_transition.run(1);
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			if (!div_transition) div_transition = create_bidirectional_transition(div, scale, {}, false);
    			div_transition.run(0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (detaching && div_transition) div_transition.end();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$8.name,
    		type: "if",
    		source: "(63:4) {#if tutorial}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$n(ctx) {
    	let t0;
    	let div;
    	let t1;
    	let t2;
    	let current;
    	let if_block0 = /*showCtx*/ ctx[6] && create_if_block_2$2(ctx);
    	let each_value = /*value*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$7(get_each_context$7(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	let if_block1 = /*icon*/ ctx[3] && create_if_block_1$2(ctx);
    	let if_block2 = /*tutorial*/ ctx[4] && create_if_block$8(ctx);

    	const block = {
    		c: function create() {
    			if (if_block0) if_block0.c();
    			t0 = space();
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t1 = space();
    			if (if_block1) if_block1.c();
    			t2 = space();
    			if (if_block2) if_block2.c();
    			attr_dev(div, "class", "board svelte-19g44m0");
    			add_location(div, file$l, 46, 0, 1193);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block0) if_block0.m(target, anchor);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			append_dev(div, t1);
    			if (if_block1) if_block1.m(div, null);
    			append_dev(div, t2);
    			if (if_block2) if_block2.m(div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*showCtx*/ ctx[6]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);

    					if (dirty & /*showCtx*/ 64) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_2$2(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(t0.parentNode, t0);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if (dirty & /*guesses, board, rows, value, context*/ 8231) {
    				each_value = /*value*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$7(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$7(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div, t1);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}

    			if (/*icon*/ ctx[3]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);
    				} else {
    					if_block1 = create_if_block_1$2(ctx);
    					if_block1.c();
    					if_block1.m(div, t2);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			if (/*tutorial*/ ctx[4]) {
    				if (if_block2) {
    					if_block2.p(ctx, dirty);

    					if (dirty & /*tutorial*/ 16) {
    						transition_in(if_block2, 1);
    					}
    				} else {
    					if_block2 = create_if_block$8(ctx);
    					if_block2.c();
    					transition_in(if_block2, 1);
    					if_block2.m(div, null);
    				}
    			} else if (if_block2) {
    				group_outros();

    				transition_out(if_block2, 1, 1, () => {
    					if_block2 = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			transition_in(if_block2);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			transition_out(if_block2);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block0) if_block0.d(detaching);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    			if (if_block1) if_block1.d();
    			if (if_block2) if_block2.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$n.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$n($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Board', slots, []);
    	let { value } = $$props;
    	let { board } = $$props;
    	let { guesses } = $$props;
    	let { icon } = $$props;
    	let { tutorial } = $$props;
    	words.active_words = words.food;

    	function shake(row) {
    		rows[row].shake();
    	}

    	function bounce(row) {
    		rows[row].bounce();
    	}

    	function hideCtx(e) {
    		if (!e || !e.defaultPrevented) $$invalidate(6, showCtx = false);
    	}

    	const dispatch = createEventDispatcher();
    	let rows = [];
    	let showCtx = false;
    	let pAns = 0;
    	let pSols = 0;
    	let x = 0;
    	let y = 0;
    	let word = "";

    	function context(cx, cy, num, val) {
    		if (guesses >= num) {
    			$$invalidate(9, x = cx);
    			$$invalidate(10, y = cy);
    			$$invalidate(6, showCtx = true);
    			$$invalidate(11, word = guesses > num ? val : "");
    			const match = getRowData(num, board);
    			$$invalidate(7, pAns = words.active_words.filter(w => match(w)).length);
    			$$invalidate(8, pSols = pAns + words.valid.filter(w => match(w)).length);
    		}
    	}

    	const writable_props = ['value', 'board', 'guesses', 'icon', 'tutorial'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Board> was created with unknown prop '${key}'`);
    	});

    	function row_binding($$value, i) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			rows[i] = $$value;
    			$$invalidate(5, rows);
    		});
    	}

    	function row_value_binding(value$1, i) {
    		if ($$self.$$.not_equal(value[i], value$1)) {
    			value[i] = value$1;
    			$$invalidate(0, value);
    		}
    	}

    	const ctx_handler = (i, e) => context(e.detail.x, e.detail.y, i, value[i]);
    	const click_handler = () => dispatch("closeTutPopUp");

    	$$self.$$set = $$props => {
    		if ('value' in $$props) $$invalidate(0, value = $$props.value);
    		if ('board' in $$props) $$invalidate(1, board = $$props.board);
    		if ('guesses' in $$props) $$invalidate(2, guesses = $$props.guesses);
    		if ('icon' in $$props) $$invalidate(3, icon = $$props.icon);
    		if ('tutorial' in $$props) $$invalidate(4, tutorial = $$props.tutorial);
    	};

    	$$self.$capture_state = () => ({
    		getRowData,
    		words,
    		Row,
    		ContextMenu,
    		createEventDispatcher,
    		scale,
    		value,
    		board,
    		guesses,
    		icon,
    		tutorial,
    		shake,
    		bounce,
    		hideCtx,
    		dispatch,
    		rows,
    		showCtx,
    		pAns,
    		pSols,
    		x,
    		y,
    		word,
    		context
    	});

    	$$self.$inject_state = $$props => {
    		if ('value' in $$props) $$invalidate(0, value = $$props.value);
    		if ('board' in $$props) $$invalidate(1, board = $$props.board);
    		if ('guesses' in $$props) $$invalidate(2, guesses = $$props.guesses);
    		if ('icon' in $$props) $$invalidate(3, icon = $$props.icon);
    		if ('tutorial' in $$props) $$invalidate(4, tutorial = $$props.tutorial);
    		if ('rows' in $$props) $$invalidate(5, rows = $$props.rows);
    		if ('showCtx' in $$props) $$invalidate(6, showCtx = $$props.showCtx);
    		if ('pAns' in $$props) $$invalidate(7, pAns = $$props.pAns);
    		if ('pSols' in $$props) $$invalidate(8, pSols = $$props.pSols);
    		if ('x' in $$props) $$invalidate(9, x = $$props.x);
    		if ('y' in $$props) $$invalidate(10, y = $$props.y);
    		if ('word' in $$props) $$invalidate(11, word = $$props.word);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		value,
    		board,
    		guesses,
    		icon,
    		tutorial,
    		rows,
    		showCtx,
    		pAns,
    		pSols,
    		x,
    		y,
    		word,
    		dispatch,
    		context,
    		shake,
    		bounce,
    		hideCtx,
    		row_binding,
    		row_value_binding,
    		ctx_handler,
    		click_handler
    	];
    }

    class Board extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init$1(this, options, instance$n, create_fragment$n, safe_not_equal, {
    			value: 0,
    			board: 1,
    			guesses: 2,
    			icon: 3,
    			tutorial: 4,
    			shake: 14,
    			bounce: 15,
    			hideCtx: 16
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Board",
    			options,
    			id: create_fragment$n.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*value*/ ctx[0] === undefined && !('value' in props)) {
    			console.warn("<Board> was created without expected prop 'value'");
    		}

    		if (/*board*/ ctx[1] === undefined && !('board' in props)) {
    			console.warn("<Board> was created without expected prop 'board'");
    		}

    		if (/*guesses*/ ctx[2] === undefined && !('guesses' in props)) {
    			console.warn("<Board> was created without expected prop 'guesses'");
    		}

    		if (/*icon*/ ctx[3] === undefined && !('icon' in props)) {
    			console.warn("<Board> was created without expected prop 'icon'");
    		}

    		if (/*tutorial*/ ctx[4] === undefined && !('tutorial' in props)) {
    			console.warn("<Board> was created without expected prop 'tutorial'");
    		}
    	}

    	get value() {
    		throw new Error("<Board>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<Board>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get board() {
    		throw new Error("<Board>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set board(value) {
    		throw new Error("<Board>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get guesses() {
    		throw new Error("<Board>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set guesses(value) {
    		throw new Error("<Board>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get icon() {
    		throw new Error("<Board>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set icon(value) {
    		throw new Error("<Board>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get tutorial() {
    		throw new Error("<Board>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set tutorial(value) {
    		throw new Error("<Board>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get shake() {
    		return this.$$.ctx[14];
    	}

    	set shake(value) {
    		throw new Error("<Board>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get bounce() {
    		return this.$$.ctx[15];
    	}

    	set bounce(value) {
    		throw new Error("<Board>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get hideCtx() {
    		return this.$$.ctx[16];
    	}

    	set hideCtx(value) {
    		throw new Error("<Board>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\keyboard\Key.svelte generated by Svelte v3.46.4 */
    const file$k = "src\\components\\keyboard\\Key.svelte";

    function create_fragment$m(ctx) {
    	let div;
    	let t;
    	let div_class_value;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[4].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(/*letter*/ ctx[0]);
    			if (default_slot) default_slot.c();
    			attr_dev(div, "class", div_class_value = "" + (null_to_empty(/*state*/ ctx[1]) + " svelte-hubf2q"));
    			toggle_class(div, "big", /*letter*/ ctx[0].length !== 1);
    			add_location(div, file$k, 6, 0, 169);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);

    			if (default_slot) {
    				default_slot.m(div, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(div, "click", /*click_handler*/ ctx[5], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (!current || dirty & /*letter*/ 1) set_data_dev(t, /*letter*/ ctx[0]);

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 8)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[3],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[3])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[3], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*state*/ 2 && div_class_value !== (div_class_value = "" + (null_to_empty(/*state*/ ctx[1]) + " svelte-hubf2q"))) {
    				attr_dev(div, "class", div_class_value);
    			}

    			if (dirty & /*state, letter*/ 3) {
    				toggle_class(div, "big", /*letter*/ ctx[0].length !== 1);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$m.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$m($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Key', slots, ['default']);
    	let { letter } = $$props;
    	let { state = "🔳" } = $$props;
    	const dispatch = createEventDispatcher();
    	const writable_props = ['letter', 'state'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Key> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => dispatch("keystroke", letter);

    	$$self.$$set = $$props => {
    		if ('letter' in $$props) $$invalidate(0, letter = $$props.letter);
    		if ('state' in $$props) $$invalidate(1, state = $$props.state);
    		if ('$$scope' in $$props) $$invalidate(3, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		letter,
    		state,
    		dispatch
    	});

    	$$self.$inject_state = $$props => {
    		if ('letter' in $$props) $$invalidate(0, letter = $$props.letter);
    		if ('state' in $$props) $$invalidate(1, state = $$props.state);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [letter, state, dispatch, $$scope, slots, click_handler];
    }

    class Key extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$m, create_fragment$m, safe_not_equal, { letter: 0, state: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Key",
    			options,
    			id: create_fragment$m.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*letter*/ ctx[0] === undefined && !('letter' in props)) {
    			console.warn("<Key> was created without expected prop 'letter'");
    		}
    	}

    	get letter() {
    		throw new Error("<Key>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set letter(value) {
    		throw new Error("<Key>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get state() {
    		throw new Error("<Key>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set state(value) {
    		throw new Error("<Key>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\keyboard\Keyboard.svelte generated by Svelte v3.46.4 */
    const file$j = "src\\components\\keyboard\\Keyboard.svelte";

    function get_each_context$6(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[13] = list[i];
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[13] = list[i];
    	return child_ctx;
    }

    function get_each_context_2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[13] = list[i];
    	return child_ctx;
    }

    // (45:2) {#each keys[0] as letter}
    function create_each_block_2(ctx) {
    	let key;
    	let current;

    	key = new Key({
    			props: {
    				letter: /*letter*/ ctx[13],
    				state: /*$letterStates*/ ctx[2][/*letter*/ ctx[13]]
    			},
    			$$inline: true
    		});

    	key.$on("keystroke", /*keystroke_handler*/ ctx[8]);

    	const block = {
    		c: function create() {
    			create_component(key.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(key, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const key_changes = {};
    			if (dirty & /*$letterStates*/ 4) key_changes.state = /*$letterStates*/ ctx[2][/*letter*/ ctx[13]];
    			key.$set(key_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(key.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(key.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(key, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2.name,
    		type: "each",
    		source: "(45:2) {#each keys[0] as letter}",
    		ctx
    	});

    	return block;
    }

    // (54:2) {#each keys[1] as letter}
    function create_each_block_1(ctx) {
    	let key;
    	let current;

    	key = new Key({
    			props: {
    				letter: /*letter*/ ctx[13],
    				state: /*$letterStates*/ ctx[2][/*letter*/ ctx[13]]
    			},
    			$$inline: true
    		});

    	key.$on("keystroke", /*keystroke_handler_1*/ ctx[9]);

    	const block = {
    		c: function create() {
    			create_component(key.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(key, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const key_changes = {};
    			if (dirty & /*$letterStates*/ 4) key_changes.state = /*$letterStates*/ ctx[2][/*letter*/ ctx[13]];
    			key.$set(key_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(key.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(key.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(key, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(54:2) {#each keys[1] as letter}",
    		ctx
    	});

    	return block;
    }

    // (64:2) {#each keys[2] as letter}
    function create_each_block$6(ctx) {
    	let key;
    	let current;

    	key = new Key({
    			props: {
    				letter: /*letter*/ ctx[13],
    				state: /*$letterStates*/ ctx[2][/*letter*/ ctx[13]]
    			},
    			$$inline: true
    		});

    	key.$on("keystroke", /*keystroke_handler_3*/ ctx[11]);

    	const block = {
    		c: function create() {
    			create_component(key.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(key, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const key_changes = {};
    			if (dirty & /*$letterStates*/ 4) key_changes.state = /*$letterStates*/ ctx[2][/*letter*/ ctx[13]];
    			key.$set(key_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(key.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(key.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(key, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$6.name,
    		type: "each",
    		source: "(64:2) {#each keys[2] as letter}",
    		ctx
    	});

    	return block;
    }

    // (71:2) <Key letter="" on:keystroke={backspaceValue}>
    function create_default_slot$3(ctx) {
    	let svg;
    	let path;

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			path = svg_element("path");
    			attr_dev(path, "d", "M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z");
    			add_location(path, file$j, 72, 16, 2186);
    			attr_dev(svg, "viewBox", "0 0 24 24");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "class", "svelte-12u4vfk");
    			add_location(svg, file$j, 71, 12, 2108);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			append_dev(svg, path);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$3.name,
    		type: "slot",
    		source: "(71:2) <Key letter=\\\"\\\" on:keystroke={backspaceValue}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$l(ctx) {
    	let t0;
    	let div3;
    	let div0;
    	let t1;
    	let div1;
    	let t2;
    	let div2;
    	let key0;
    	let t3;
    	let t4;
    	let key1;
    	let current;
    	let mounted;
    	let dispose;
    	let each_value_2 = keys[0];
    	validate_each_argument(each_value_2);
    	let each_blocks_2 = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks_2[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
    	}

    	const out = i => transition_out(each_blocks_2[i], 1, 1, () => {
    		each_blocks_2[i] = null;
    	});

    	let each_value_1 = keys[1];
    	validate_each_argument(each_value_1);
    	let each_blocks_1 = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks_1[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	const out_1 = i => transition_out(each_blocks_1[i], 1, 1, () => {
    		each_blocks_1[i] = null;
    	});

    	key0 = new Key({
    			props: { letter: "ENTER" },
    			$$inline: true
    		});

    	key0.$on("keystroke", /*keystroke_handler_2*/ ctx[10]);
    	let each_value = keys[2];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$6(get_each_context$6(ctx, each_value, i));
    	}

    	const out_2 = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	key1 = new Key({
    			props: {
    				letter: "",
    				$$slots: { default: [create_default_slot$3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	key1.$on("keystroke", /*backspaceValue*/ ctx[5]);

    	const block = {
    		c: function create() {
    			t0 = space();
    			div3 = element("div");
    			div0 = element("div");

    			for (let i = 0; i < each_blocks_2.length; i += 1) {
    				each_blocks_2[i].c();
    			}

    			t1 = space();
    			div1 = element("div");

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].c();
    			}

    			t2 = space();
    			div2 = element("div");
    			create_component(key0.$$.fragment);
    			t3 = space();

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t4 = space();
    			create_component(key1.$$.fragment);
    			attr_dev(div0, "class", "row svelte-12u4vfk");
    			add_location(div0, file$j, 43, 1, 1425);
    			attr_dev(div1, "class", "row svelte-12u4vfk");
    			add_location(div1, file$j, 52, 1, 1608);
    			attr_dev(div2, "class", "row svelte-12u4vfk");
    			add_location(div2, file$j, 61, 1, 1791);
    			attr_dev(div3, "class", "keyboard svelte-12u4vfk");
    			toggle_class(div3, "preventChange", /*preventChange*/ ctx[1]);
    			add_location(div3, file$j, 42, 0, 1380);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div0);

    			for (let i = 0; i < each_blocks_2.length; i += 1) {
    				each_blocks_2[i].m(div0, null);
    			}

    			append_dev(div3, t1);
    			append_dev(div3, div1);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				each_blocks_1[i].m(div1, null);
    			}

    			append_dev(div3, t2);
    			append_dev(div3, div2);
    			mount_component(key0, div2, null);
    			append_dev(div2, t3);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div2, null);
    			}

    			append_dev(div2, t4);
    			mount_component(key1, div2, null);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(document.body, "keydown", /*handleKeystroke*/ ctx[6], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*keys, $letterStates, appendValue*/ 20) {
    				each_value_2 = keys[0];
    				validate_each_argument(each_value_2);
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2(ctx, each_value_2, i);

    					if (each_blocks_2[i]) {
    						each_blocks_2[i].p(child_ctx, dirty);
    						transition_in(each_blocks_2[i], 1);
    					} else {
    						each_blocks_2[i] = create_each_block_2(child_ctx);
    						each_blocks_2[i].c();
    						transition_in(each_blocks_2[i], 1);
    						each_blocks_2[i].m(div0, null);
    					}
    				}

    				group_outros();

    				for (i = each_value_2.length; i < each_blocks_2.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}

    			if (dirty & /*keys, $letterStates, appendValue*/ 20) {
    				each_value_1 = keys[1];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks_1[i]) {
    						each_blocks_1[i].p(child_ctx, dirty);
    						transition_in(each_blocks_1[i], 1);
    					} else {
    						each_blocks_1[i] = create_each_block_1(child_ctx);
    						each_blocks_1[i].c();
    						transition_in(each_blocks_1[i], 1);
    						each_blocks_1[i].m(div1, null);
    					}
    				}

    				group_outros();

    				for (i = each_value_1.length; i < each_blocks_1.length; i += 1) {
    					out_1(i);
    				}

    				check_outros();
    			}

    			if (dirty & /*keys, $letterStates, appendValue*/ 20) {
    				each_value = keys[2];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$6(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$6(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div2, t4);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out_2(i);
    				}

    				check_outros();
    			}

    			const key1_changes = {};

    			if (dirty & /*$$scope*/ 1048576) {
    				key1_changes.$$scope = { dirty, ctx };
    			}

    			key1.$set(key1_changes);

    			if (dirty & /*preventChange*/ 2) {
    				toggle_class(div3, "preventChange", /*preventChange*/ ctx[1]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value_2.length; i += 1) {
    				transition_in(each_blocks_2[i]);
    			}

    			for (let i = 0; i < each_value_1.length; i += 1) {
    				transition_in(each_blocks_1[i]);
    			}

    			transition_in(key0.$$.fragment, local);

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			transition_in(key1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks_2 = each_blocks_2.filter(Boolean);

    			for (let i = 0; i < each_blocks_2.length; i += 1) {
    				transition_out(each_blocks_2[i]);
    			}

    			each_blocks_1 = each_blocks_1.filter(Boolean);

    			for (let i = 0; i < each_blocks_1.length; i += 1) {
    				transition_out(each_blocks_1[i]);
    			}

    			transition_out(key0.$$.fragment, local);
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			transition_out(key1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div3);
    			destroy_each(each_blocks_2, detaching);
    			destroy_each(each_blocks_1, detaching);
    			destroy_component(key0);
    			destroy_each(each_blocks, detaching);
    			destroy_component(key1);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$l.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$l($$self, $$props, $$invalidate) {
    	let $letterStates;
    	validate_store(letterStates, 'letterStates');
    	component_subscribe($$self, letterStates, $$value => $$invalidate(2, $letterStates = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Keyboard', slots, []);
    	let { value = "" } = $$props;
    	let { disabled = false } = $$props;
    	let preventChange = true;
    	const dispatch = createEventDispatcher();

    	function appendValue(char) {
    		if (!disabled && value.length < COLS) {
    			dispatch("keystroke", char);
    			$$invalidate(7, value += char);
    		}
    	}

    	function backspaceValue() {
    		if (!disabled) {
    			$$invalidate(7, value = value.slice(0, value.length - 1));
    		}
    	}

    	function handleKeystroke(e) {
    		if (!disabled && !e.ctrlKey && !e.altKey) {
    			if (e.key && (/^[a-z]$/).test(e.key.toLowerCase())) {
    				return appendValue(e.key.toLowerCase());
    			}

    			if (e.key === "Backspace") return backspaceValue();
    			if (e.key === "Enter") return dispatch("submitWord");
    		}

    		if (e.key === "Escape") dispatch("esc");
    	}

    	// Ensure keys change on load instead of loading their state color & change the color of all the keys to neutral, then to their correct color on mode change
    	const unsub = mode.subscribe(() => {
    		$$invalidate(1, preventChange = true);
    		setTimeout(() => $$invalidate(1, preventChange = false), 200);
    	});

    	onDestroy(unsub);
    	const writable_props = ['value', 'disabled'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Keyboard> was created with unknown prop '${key}'`);
    	});

    	const keystroke_handler = e => appendValue(e.detail);
    	const keystroke_handler_1 = e => appendValue(e.detail);
    	const keystroke_handler_2 = () => !disabled && dispatch("submitWord");
    	const keystroke_handler_3 = e => appendValue(e.detail);

    	$$self.$$set = $$props => {
    		if ('value' in $$props) $$invalidate(7, value = $$props.value);
    		if ('disabled' in $$props) $$invalidate(0, disabled = $$props.disabled);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		onDestroy,
    		letterStates,
    		mode,
    		COLS,
    		keys,
    		Key,
    		value,
    		disabled,
    		preventChange,
    		dispatch,
    		appendValue,
    		backspaceValue,
    		handleKeystroke,
    		unsub,
    		$letterStates
    	});

    	$$self.$inject_state = $$props => {
    		if ('value' in $$props) $$invalidate(7, value = $$props.value);
    		if ('disabled' in $$props) $$invalidate(0, disabled = $$props.disabled);
    		if ('preventChange' in $$props) $$invalidate(1, preventChange = $$props.preventChange);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		disabled,
    		preventChange,
    		$letterStates,
    		dispatch,
    		appendValue,
    		backspaceValue,
    		handleKeystroke,
    		value,
    		keystroke_handler,
    		keystroke_handler_1,
    		keystroke_handler_2,
    		keystroke_handler_3
    	];
    }

    class Keyboard extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$l, create_fragment$l, safe_not_equal, { value: 7, disabled: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Keyboard",
    			options,
    			id: create_fragment$l.name
    		});
    	}

    	get value() {
    		throw new Error("<Keyboard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<Keyboard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<Keyboard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<Keyboard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\Modal.svelte generated by Svelte v3.46.4 */
    const file$i = "src\\components\\Modal.svelte";
    const get_footer_slot_changes = dirty => ({});
    const get_footer_slot_context = ctx => ({});

    // (24:0) {:else}
    function create_else_block$2(ctx) {
    	let div2;
    	let div1;
    	let div0;
    	let gameicon;
    	let t;
    	let current;
    	let mounted;
    	let dispose;

    	gameicon = new GameIcon({
    			props: {
    				$$slots: { default: [create_default_slot_1$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const default_slot_template = /*#slots*/ ctx[3].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[4], null);

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			create_component(gameicon.$$.fragment);
    			t = space();
    			if (default_slot) default_slot.c();
    			attr_dev(div0, "class", "exit svelte-t70b3b");
    			add_location(div0, file$i, 26, 3, 718);
    			attr_dev(div1, "class", "modal svelte-t70b3b");
    			add_location(div1, file$i, 25, 2, 694);
    			attr_dev(div2, "class", "overlay svelte-t70b3b");
    			toggle_class(div2, "visible", /*visible*/ ctx[0]);
    			add_location(div2, file$i, 24, 1, 633);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div1);
    			append_dev(div1, div0);
    			mount_component(gameicon, div0, null);
    			append_dev(div1, t);

    			if (default_slot) {
    				default_slot.m(div1, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(div0, "click", /*close*/ ctx[2], false, false, false),
    					listen_dev(div2, "click", self$1(/*close*/ ctx[2]), false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			const gameicon_changes = {};

    			if (dirty & /*$$scope*/ 16) {
    				gameicon_changes.$$scope = { dirty, ctx };
    			}

    			gameicon.$set(gameicon_changes);

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 16)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[4],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[4])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[4], dirty, null),
    						null
    					);
    				}
    			}

    			if (dirty & /*visible*/ 1) {
    				toggle_class(div2, "visible", /*visible*/ ctx[0]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(gameicon.$$.fragment, local);
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(gameicon.$$.fragment, local);
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			destroy_component(gameicon);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$2.name,
    		type: "else",
    		source: "(24:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (12:0) {#if fullscreen}
    function create_if_block$7(ctx) {
    	let div2;
    	let div0;
    	let gameicon;
    	let t0;
    	let div1;
    	let t1;
    	let current;
    	let mounted;
    	let dispose;

    	gameicon = new GameIcon({
    			props: {
    				$$slots: { default: [create_default_slot$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const default_slot_template = /*#slots*/ ctx[3].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[4], null);
    	const footer_slot_template = /*#slots*/ ctx[3].footer;
    	const footer_slot = create_slot(footer_slot_template, ctx, /*$$scope*/ ctx[4], get_footer_slot_context);

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			create_component(gameicon.$$.fragment);
    			t0 = space();
    			div1 = element("div");
    			if (default_slot) default_slot.c();
    			t1 = space();
    			if (footer_slot) footer_slot.c();
    			attr_dev(div0, "class", "exit svelte-t70b3b");
    			add_location(div0, file$i, 13, 2, 349);
    			add_location(div1, file$i, 19, 2, 560);
    			attr_dev(div2, "class", "page svelte-t70b3b");
    			toggle_class(div2, "visible", /*visible*/ ctx[0]);
    			add_location(div2, file$i, 12, 1, 313);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			mount_component(gameicon, div0, null);
    			append_dev(div2, t0);
    			append_dev(div2, div1);

    			if (default_slot) {
    				default_slot.m(div1, null);
    			}

    			append_dev(div2, t1);

    			if (footer_slot) {
    				footer_slot.m(div2, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(div0, "click", /*close*/ ctx[2], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			const gameicon_changes = {};

    			if (dirty & /*$$scope*/ 16) {
    				gameicon_changes.$$scope = { dirty, ctx };
    			}

    			gameicon.$set(gameicon_changes);

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 16)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[4],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[4])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[4], dirty, null),
    						null
    					);
    				}
    			}

    			if (footer_slot) {
    				if (footer_slot.p && (!current || dirty & /*$$scope*/ 16)) {
    					update_slot_base(
    						footer_slot,
    						footer_slot_template,
    						ctx,
    						/*$$scope*/ ctx[4],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[4])
    						: get_slot_changes(footer_slot_template, /*$$scope*/ ctx[4], dirty, get_footer_slot_changes),
    						get_footer_slot_context
    					);
    				}
    			}

    			if (dirty & /*visible*/ 1) {
    				toggle_class(div2, "visible", /*visible*/ ctx[0]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(gameicon.$$.fragment, local);
    			transition_in(default_slot, local);
    			transition_in(footer_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(gameicon.$$.fragment, local);
    			transition_out(default_slot, local);
    			transition_out(footer_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			destroy_component(gameicon);
    			if (default_slot) default_slot.d(detaching);
    			if (footer_slot) footer_slot.d(detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$7.name,
    		type: "if",
    		source: "(12:0) {#if fullscreen}",
    		ctx
    	});

    	return block;
    }

    // (28:4) <GameIcon>
    function create_default_slot_1$1(ctx) {
    	let path;

    	const block = {
    		c: function create() {
    			path = svg_element("path");
    			attr_dev(path, "d", "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z");
    			add_location(path, file$i, 28, 5, 776);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, path, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(path);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1$1.name,
    		type: "slot",
    		source: "(28:4) <GameIcon>",
    		ctx
    	});

    	return block;
    }

    // (15:3) <GameIcon>
    function create_default_slot$2(ctx) {
    	let path;

    	const block = {
    		c: function create() {
    			path = svg_element("path");
    			attr_dev(path, "d", "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z");
    			add_location(path, file$i, 15, 4, 405);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, path, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(path);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$2.name,
    		type: "slot",
    		source: "(15:3) <GameIcon>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$k(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$7, create_else_block$2];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*fullscreen*/ ctx[1]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$k.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$k($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Modal', slots, ['default','footer']);
    	let { visible = false } = $$props;
    	let { fullscreen = false } = $$props;
    	const dispach = createEventDispatcher();

    	function close() {
    		$$invalidate(0, visible = false);
    		dispach("close");
    	}

    	const writable_props = ['visible', 'fullscreen'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Modal> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('visible' in $$props) $$invalidate(0, visible = $$props.visible);
    		if ('fullscreen' in $$props) $$invalidate(1, fullscreen = $$props.fullscreen);
    		if ('$$scope' in $$props) $$invalidate(4, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		GameIcon,
    		visible,
    		fullscreen,
    		dispach,
    		close
    	});

    	$$self.$inject_state = $$props => {
    		if ('visible' in $$props) $$invalidate(0, visible = $$props.visible);
    		if ('fullscreen' in $$props) $$invalidate(1, fullscreen = $$props.fullscreen);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [visible, fullscreen, close, slots, $$scope];
    }

    class Modal extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$k, create_fragment$k, safe_not_equal, { visible: 0, fullscreen: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Modal",
    			options,
    			id: create_fragment$k.name
    		});
    	}

    	get visible() {
    		throw new Error("<Modal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set visible(value) {
    		throw new Error("<Modal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get fullscreen() {
    		throw new Error("<Modal>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set fullscreen(value) {
    		throw new Error("<Modal>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\settings\Switch.svelte generated by Svelte v3.46.4 */

    const file$h = "src\\components\\settings\\Switch.svelte";

    function create_fragment$j(ctx) {
    	let div;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			attr_dev(div, "disabled", /*disabled*/ ctx[1]);
    			attr_dev(div, "class", "svelte-16o9p8g");
    			toggle_class(div, "checked", /*value*/ ctx[0]);
    			add_location(div, file$h, 4, 0, 80);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (!mounted) {
    				dispose = listen_dev(div, "click", /*click_handler*/ ctx[2], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*disabled*/ 2) {
    				attr_dev(div, "disabled", /*disabled*/ ctx[1]);
    			}

    			if (dirty & /*value*/ 1) {
    				toggle_class(div, "checked", /*value*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$j.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$j($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Switch', slots, []);
    	let { value } = $$props;
    	let { disabled = false } = $$props;
    	const writable_props = ['value', 'disabled'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Switch> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => !disabled && $$invalidate(0, value = !value);

    	$$self.$$set = $$props => {
    		if ('value' in $$props) $$invalidate(0, value = $$props.value);
    		if ('disabled' in $$props) $$invalidate(1, disabled = $$props.disabled);
    	};

    	$$self.$capture_state = () => ({ value, disabled });

    	$$self.$inject_state = $$props => {
    		if ('value' in $$props) $$invalidate(0, value = $$props.value);
    		if ('disabled' in $$props) $$invalidate(1, disabled = $$props.disabled);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [value, disabled, click_handler];
    }

    class Switch extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$j, create_fragment$j, safe_not_equal, { value: 0, disabled: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Switch",
    			options,
    			id: create_fragment$j.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*value*/ ctx[0] === undefined && !('value' in props)) {
    			console.warn("<Switch> was created without expected prop 'value'");
    		}
    	}

    	get value() {
    		throw new Error("<Switch>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<Switch>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<Switch>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<Switch>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\settings\DropDown.svelte generated by Svelte v3.46.4 */

    const file$g = "src\\components\\settings\\DropDown.svelte";

    function get_each_context$5(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[4] = list[i];
    	child_ctx[6] = i;
    	return child_ctx;
    }

    // (7:1) {#each options as val, i}
    function create_each_block$5(ctx) {
    	let option;
    	let t_value = /*val*/ ctx[4] + "";
    	let t;

    	const block = {
    		c: function create() {
    			option = element("option");
    			t = text(t_value);
    			option.__value = /*i*/ ctx[6];
    			option.value = option.__value;
    			add_location(option, file$g, 7, 2, 163);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    			append_dev(option, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*options*/ 2 && t_value !== (t_value = /*val*/ ctx[4] + "")) set_data_dev(t, t_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$5.name,
    		type: "each",
    		source: "(7:1) {#each options as val, i}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$i(ctx) {
    	let select;
    	let mounted;
    	let dispose;
    	let each_value = /*options*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$5(get_each_context$5(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			select = element("select");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			select.disabled = /*disabled*/ ctx[2];
    			attr_dev(select, "class", "svelte-crc67x");
    			if (/*value*/ ctx[0] === void 0) add_render_callback(() => /*select_change_handler*/ ctx[3].call(select));
    			add_location(select, file$g, 5, 0, 101);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, select, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(select, null);
    			}

    			select_option(select, /*value*/ ctx[0]);

    			if (!mounted) {
    				dispose = listen_dev(select, "change", /*select_change_handler*/ ctx[3]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*options*/ 2) {
    				each_value = /*options*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$5(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$5(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(select, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (dirty & /*disabled*/ 4) {
    				prop_dev(select, "disabled", /*disabled*/ ctx[2]);
    			}

    			if (dirty & /*value*/ 1) {
    				select_option(select, /*value*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(select);
    			destroy_each(each_blocks, detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$i.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$i($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('DropDown', slots, []);
    	let { value } = $$props;
    	let { options } = $$props;
    	let { disabled = false } = $$props;
    	const writable_props = ['value', 'options', 'disabled'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<DropDown> was created with unknown prop '${key}'`);
    	});

    	function select_change_handler() {
    		value = select_value(this);
    		$$invalidate(0, value);
    	}

    	$$self.$$set = $$props => {
    		if ('value' in $$props) $$invalidate(0, value = $$props.value);
    		if ('options' in $$props) $$invalidate(1, options = $$props.options);
    		if ('disabled' in $$props) $$invalidate(2, disabled = $$props.disabled);
    	};

    	$$self.$capture_state = () => ({ value, options, disabled });

    	$$self.$inject_state = $$props => {
    		if ('value' in $$props) $$invalidate(0, value = $$props.value);
    		if ('options' in $$props) $$invalidate(1, options = $$props.options);
    		if ('disabled' in $$props) $$invalidate(2, disabled = $$props.disabled);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [value, options, disabled, select_change_handler];
    }

    class DropDown extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$i, create_fragment$i, safe_not_equal, { value: 0, options: 1, disabled: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "DropDown",
    			options,
    			id: create_fragment$i.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*value*/ ctx[0] === undefined && !('value' in props)) {
    			console.warn("<DropDown> was created without expected prop 'value'");
    		}

    		if (/*options*/ ctx[1] === undefined && !('options' in props)) {
    			console.warn("<DropDown> was created without expected prop 'options'");
    		}
    	}

    	get value() {
    		throw new Error("<DropDown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<DropDown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get options() {
    		throw new Error("<DropDown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set options(value) {
    		throw new Error("<DropDown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<DropDown>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<DropDown>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\settings\Setting.svelte generated by Svelte v3.46.4 */
    const file$f = "src\\components\\settings\\Setting.svelte";
    const get_desc_slot_changes = dirty => ({});
    const get_desc_slot_context = ctx => ({});
    const get_title_slot_changes = dirty => ({});
    const get_title_slot_context = ctx => ({});

    function create_fragment$h(ctx) {
    	let div3;
    	let div2;
    	let div0;
    	let t0;
    	let div1;
    	let t1;
    	let switch_instance;
    	let updating_value;
    	let current;
    	const title_slot_template = /*#slots*/ ctx[6].title;
    	const title_slot = create_slot(title_slot_template, ctx, /*$$scope*/ ctx[5], get_title_slot_context);
    	const desc_slot_template = /*#slots*/ ctx[6].desc;
    	const desc_slot = create_slot(desc_slot_template, ctx, /*$$scope*/ ctx[5], get_desc_slot_context);

    	function switch_instance_value_binding(value) {
    		/*switch_instance_value_binding*/ ctx[7](value);
    	}

    	var switch_value = /*types*/ ctx[4][/*type*/ ctx[1]];

    	function switch_props(ctx) {
    		let switch_instance_props = {
    			options: /*options*/ ctx[2],
    			disabled: /*disabled*/ ctx[3]
    		};

    		if (/*value*/ ctx[0] !== void 0) {
    			switch_instance_props.value = /*value*/ ctx[0];
    		}

    		return {
    			props: switch_instance_props,
    			$$inline: true
    		};
    	}

    	if (switch_value) {
    		switch_instance = new switch_value(switch_props(ctx));
    		binding_callbacks.push(() => bind(switch_instance, 'value', switch_instance_value_binding));
    	}

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			div2 = element("div");
    			div0 = element("div");
    			if (title_slot) title_slot.c();
    			t0 = space();
    			div1 = element("div");
    			if (desc_slot) desc_slot.c();
    			t1 = space();
    			if (switch_instance) create_component(switch_instance.$$.fragment);
    			attr_dev(div0, "class", "title svelte-1988bfb");
    			add_location(div0, file$f, 14, 2, 305);
    			attr_dev(div1, "class", "desc svelte-1988bfb");
    			add_location(div1, file$f, 15, 2, 355);
    			add_location(div2, file$f, 13, 1, 296);
    			attr_dev(div3, "class", "setting svelte-1988bfb");
    			add_location(div3, file$f, 12, 0, 272);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, div2);
    			append_dev(div2, div0);

    			if (title_slot) {
    				title_slot.m(div0, null);
    			}

    			append_dev(div2, t0);
    			append_dev(div2, div1);

    			if (desc_slot) {
    				desc_slot.m(div1, null);
    			}

    			append_dev(div3, t1);

    			if (switch_instance) {
    				mount_component(switch_instance, div3, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (title_slot) {
    				if (title_slot.p && (!current || dirty & /*$$scope*/ 32)) {
    					update_slot_base(
    						title_slot,
    						title_slot_template,
    						ctx,
    						/*$$scope*/ ctx[5],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[5])
    						: get_slot_changes(title_slot_template, /*$$scope*/ ctx[5], dirty, get_title_slot_changes),
    						get_title_slot_context
    					);
    				}
    			}

    			if (desc_slot) {
    				if (desc_slot.p && (!current || dirty & /*$$scope*/ 32)) {
    					update_slot_base(
    						desc_slot,
    						desc_slot_template,
    						ctx,
    						/*$$scope*/ ctx[5],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[5])
    						: get_slot_changes(desc_slot_template, /*$$scope*/ ctx[5], dirty, get_desc_slot_changes),
    						get_desc_slot_context
    					);
    				}
    			}

    			const switch_instance_changes = {};
    			if (dirty & /*options*/ 4) switch_instance_changes.options = /*options*/ ctx[2];
    			if (dirty & /*disabled*/ 8) switch_instance_changes.disabled = /*disabled*/ ctx[3];

    			if (!updating_value && dirty & /*value*/ 1) {
    				updating_value = true;
    				switch_instance_changes.value = /*value*/ ctx[0];
    				add_flush_callback(() => updating_value = false);
    			}

    			if (switch_value !== (switch_value = /*types*/ ctx[4][/*type*/ ctx[1]])) {
    				if (switch_instance) {
    					group_outros();
    					const old_component = switch_instance;

    					transition_out(old_component.$$.fragment, 1, 0, () => {
    						destroy_component(old_component, 1);
    					});

    					check_outros();
    				}

    				if (switch_value) {
    					switch_instance = new switch_value(switch_props(ctx));
    					binding_callbacks.push(() => bind(switch_instance, 'value', switch_instance_value_binding));
    					create_component(switch_instance.$$.fragment);
    					transition_in(switch_instance.$$.fragment, 1);
    					mount_component(switch_instance, div3, null);
    				} else {
    					switch_instance = null;
    				}
    			} else if (switch_value) {
    				switch_instance.$set(switch_instance_changes);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(title_slot, local);
    			transition_in(desc_slot, local);
    			if (switch_instance) transition_in(switch_instance.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(title_slot, local);
    			transition_out(desc_slot, local);
    			if (switch_instance) transition_out(switch_instance.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    			if (title_slot) title_slot.d(detaching);
    			if (desc_slot) desc_slot.d(detaching);
    			if (switch_instance) destroy_component(switch_instance);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$h.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$h($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Setting', slots, ['title','desc']);
    	let { value } = $$props;
    	let { type } = $$props;
    	let { options = [] } = $$props;
    	let { disabled = false } = $$props;
    	const types = { switch: Switch, dropdown: DropDown };
    	const writable_props = ['value', 'type', 'options', 'disabled'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Setting> was created with unknown prop '${key}'`);
    	});

    	function switch_instance_value_binding(value$1) {
    		value = value$1;
    		$$invalidate(0, value);
    	}

    	$$self.$$set = $$props => {
    		if ('value' in $$props) $$invalidate(0, value = $$props.value);
    		if ('type' in $$props) $$invalidate(1, type = $$props.type);
    		if ('options' in $$props) $$invalidate(2, options = $$props.options);
    		if ('disabled' in $$props) $$invalidate(3, disabled = $$props.disabled);
    		if ('$$scope' in $$props) $$invalidate(5, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		Switch,
    		DropDown,
    		value,
    		type,
    		options,
    		disabled,
    		types
    	});

    	$$self.$inject_state = $$props => {
    		if ('value' in $$props) $$invalidate(0, value = $$props.value);
    		if ('type' in $$props) $$invalidate(1, type = $$props.type);
    		if ('options' in $$props) $$invalidate(2, options = $$props.options);
    		if ('disabled' in $$props) $$invalidate(3, disabled = $$props.disabled);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		value,
    		type,
    		options,
    		disabled,
    		types,
    		$$scope,
    		slots,
    		switch_instance_value_binding
    	];
    }

    class Setting extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init$1(this, options, instance$h, create_fragment$h, safe_not_equal, {
    			value: 0,
    			type: 1,
    			options: 2,
    			disabled: 3
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Setting",
    			options,
    			id: create_fragment$h.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*value*/ ctx[0] === undefined && !('value' in props)) {
    			console.warn("<Setting> was created without expected prop 'value'");
    		}

    		if (/*type*/ ctx[1] === undefined && !('type' in props)) {
    			console.warn("<Setting> was created without expected prop 'type'");
    		}
    	}

    	get value() {
    		throw new Error("<Setting>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<Setting>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get type() {
    		throw new Error("<Setting>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set type(value) {
    		throw new Error("<Setting>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get options() {
    		throw new Error("<Setting>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set options(value) {
    		throw new Error("<Setting>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get disabled() {
    		throw new Error("<Setting>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set disabled(value) {
    		throw new Error("<Setting>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\settings\Settings.svelte generated by Svelte v3.46.4 */
    const file$e = "src\\components\\settings\\Settings.svelte";

    // (42:16) 
    function create_title_slot_4(ctx) {
    	let span;

    	const block = {
    		c: function create() {
    			span = element("span");
    			span.textContent = "Food Words";
    			attr_dev(span, "slot", "title");
    			add_location(span, file$e, 41, 16, 1565);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_title_slot_4.name,
    		type: "slot",
    		source: "(42:16) ",
    		ctx
    	});

    	return block;
    }

    // (43:16) 
    function create_desc_slot_3(ctx) {
    	let span;

    	const block = {
    		c: function create() {
    			span = element("span");
    			span.textContent = "Only exact food words i.e. ramen or pizza, and not spoon";
    			attr_dev(span, "slot", "desc");
    			add_location(span, file$e, 42, 16, 1619);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_desc_slot_3.name,
    		type: "slot",
    		source: "(43:16) ",
    		ctx
    	});

    	return block;
    }

    // (56:16) 
    function create_title_slot_3(ctx) {
    	let span;

    	const block = {
    		c: function create() {
    			span = element("span");
    			span.textContent = "Hard Mode";
    			attr_dev(span, "slot", "title");
    			add_location(span, file$e, 55, 16, 2023);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_title_slot_3.name,
    		type: "slot",
    		source: "(56:16) ",
    		ctx
    	});

    	return block;
    }

    // (57:16) 
    function create_desc_slot_2(ctx) {
    	let span;

    	const block = {
    		c: function create() {
    			span = element("span");
    			span.textContent = "Any revealed hints must be used in subsequent guesses";
    			attr_dev(span, "slot", "desc");
    			add_location(span, file$e, 56, 16, 2076);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_desc_slot_2.name,
    		type: "slot",
    		source: "(57:16) ",
    		ctx
    	});

    	return block;
    }

    // (62:12) 
    function create_title_slot_2(ctx) {
    	let span;

    	const block = {
    		c: function create() {
    			span = element("span");
    			span.textContent = "Dark Theme";
    			attr_dev(span, "slot", "title");
    			add_location(span, file$e, 61, 12, 2271);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_title_slot_2.name,
    		type: "slot",
    		source: "(62:12) ",
    		ctx
    	});

    	return block;
    }

    // (65:12) 
    function create_title_slot_1(ctx) {
    	let span;

    	const block = {
    		c: function create() {
    			span = element("span");
    			span.textContent = "Color Blind Mode";
    			attr_dev(span, "slot", "title");
    			add_location(span, file$e, 64, 12, 2408);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_title_slot_1.name,
    		type: "slot",
    		source: "(65:12) ",
    		ctx
    	});

    	return block;
    }

    // (66:12) 
    function create_desc_slot_1(ctx) {
    	let span;

    	const block = {
    		c: function create() {
    			span = element("span");
    			span.textContent = "High contrast colors";
    			attr_dev(span, "slot", "desc");
    			add_location(span, file$e, 65, 12, 2464);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_desc_slot_1.name,
    		type: "slot",
    		source: "(66:12) ",
    		ctx
    	});

    	return block;
    }

    // (69:12) 
    function create_title_slot(ctx) {
    	let span;

    	const block = {
    		c: function create() {
    			span = element("span");
    			span.textContent = "Game Mode";
    			attr_dev(span, "slot", "title");
    			add_location(span, file$e, 68, 12, 2641);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_title_slot.name,
    		type: "slot",
    		source: "(69:12) ",
    		ctx
    	});

    	return block;
    }

    // (70:12) 
    function create_desc_slot(ctx) {
    	let span;

    	const block = {
    		c: function create() {
    			span = element("span");
    			span.textContent = "The game mode determines how often the word refreshes";
    			attr_dev(span, "slot", "desc");
    			add_location(span, file$e, 69, 12, 2690);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_desc_slot.name,
    		type: "slot",
    		source: "(70:12) ",
    		ctx
    	});

    	return block;
    }

    function create_fragment$g(ctx) {
    	let div4;
    	let div3;
    	let h3;
    	let t1;
    	let div0;
    	let setting0;
    	let updating_value;
    	let t2;
    	let div1;
    	let setting1;
    	let updating_value_1;
    	let t3;
    	let setting2;
    	let updating_value_2;
    	let t4;
    	let setting3;
    	let updating_value_3;
    	let t5;
    	let setting4;
    	let updating_value_4;
    	let t6;
    	let div2;
    	let a0;
    	let t8;
    	let span;
    	let t10;
    	let a1;
    	let current;
    	let mounted;
    	let dispose;

    	function setting0_value_binding(value) {
    		/*setting0_value_binding*/ ctx[6](value);
    	}

    	let setting0_props = {
    		type: "switch",
    		disabled: /*state*/ ctx[0].guesses !== 0,
    		$$slots: {
    			desc: [create_desc_slot_3],
    			title: [create_title_slot_4]
    		},
    		$$scope: { ctx }
    	};

    	if (/*state*/ ctx[0].foodOnly !== void 0) {
    		setting0_props.value = /*state*/ ctx[0].foodOnly;
    	}

    	setting0 = new Setting({ props: setting0_props, $$inline: true });
    	binding_callbacks.push(() => bind(setting0, 'value', setting0_value_binding));

    	function setting1_value_binding(value) {
    		/*setting1_value_binding*/ ctx[8](value);
    	}

    	let setting1_props = {
    		type: "switch",
    		disabled: !/*state*/ ctx[0].validHard,
    		$$slots: {
    			desc: [create_desc_slot_2],
    			title: [create_title_slot_3]
    		},
    		$$scope: { ctx }
    	};

    	if (/*$settings*/ ctx[1].hard[/*$mode*/ ctx[2]] !== void 0) {
    		setting1_props.value = /*$settings*/ ctx[1].hard[/*$mode*/ ctx[2]];
    	}

    	setting1 = new Setting({ props: setting1_props, $$inline: true });
    	binding_callbacks.push(() => bind(setting1, 'value', setting1_value_binding));

    	function setting2_value_binding(value) {
    		/*setting2_value_binding*/ ctx[10](value);
    	}

    	let setting2_props = {
    		type: "switch",
    		$$slots: { title: [create_title_slot_2] },
    		$$scope: { ctx }
    	};

    	if (/*$settings*/ ctx[1].dark !== void 0) {
    		setting2_props.value = /*$settings*/ ctx[1].dark;
    	}

    	setting2 = new Setting({ props: setting2_props, $$inline: true });
    	binding_callbacks.push(() => bind(setting2, 'value', setting2_value_binding));

    	function setting3_value_binding(value) {
    		/*setting3_value_binding*/ ctx[11](value);
    	}

    	let setting3_props = {
    		type: "switch",
    		$$slots: {
    			desc: [create_desc_slot_1],
    			title: [create_title_slot_1]
    		},
    		$$scope: { ctx }
    	};

    	if (/*$settings*/ ctx[1].colorblind !== void 0) {
    		setting3_props.value = /*$settings*/ ctx[1].colorblind;
    	}

    	setting3 = new Setting({ props: setting3_props, $$inline: true });
    	binding_callbacks.push(() => bind(setting3, 'value', setting3_value_binding));

    	function setting4_value_binding(value) {
    		/*setting4_value_binding*/ ctx[12](value);
    	}

    	let setting4_props = {
    		type: "dropdown",
    		options: modeData.modes.map(func),
    		$$slots: {
    			desc: [create_desc_slot],
    			title: [create_title_slot]
    		},
    		$$scope: { ctx }
    	};

    	if (/*$mode*/ ctx[2] !== void 0) {
    		setting4_props.value = /*$mode*/ ctx[2];
    	}

    	setting4 = new Setting({ props: setting4_props, $$inline: true });
    	binding_callbacks.push(() => bind(setting4, 'value', setting4_value_binding));

    	const block = {
    		c: function create() {
    			div4 = element("div");
    			div3 = element("div");
    			h3 = element("h3");
    			h3.textContent = "settings";
    			t1 = space();
    			div0 = element("div");
    			create_component(setting0.$$.fragment);
    			t2 = space();
    			div1 = element("div");
    			create_component(setting1.$$.fragment);
    			t3 = space();
    			create_component(setting2.$$.fragment);
    			t4 = space();
    			create_component(setting3.$$.fragment);
    			t5 = space();
    			create_component(setting4.$$.fragment);
    			t6 = space();
    			div2 = element("div");
    			a0 = element("a");
    			a0.textContent = "Support me";
    			t8 = space();
    			span = element("span");
    			span.textContent = "Suggest a word";
    			t10 = space();
    			a1 = element("a");
    			a1.textContent = "Report a\r\n                Bug";
    			add_location(h3, file$e, 26, 8, 1002);
    			add_location(div0, file$e, 27, 8, 1029);
    			add_location(div1, file$e, 46, 8, 1752);
    			attr_dev(a0, "href", "https://www.buymeacoffee.com/JasonLovesDoggo");
    			attr_dev(a0, "target", "_blank");
    			add_location(a0, file$e, 72, 12, 2831);
    			set_style(span, "text-decoration", "underline");
    			add_location(span, file$e, 73, 12, 2930);
    			attr_dev(a1, "href", "https://github.com/JasonLovesDoggo/JasonLovesDoggo.github.io/issues/new");
    			attr_dev(a1, "target", "_blank");
    			add_location(a1, file$e, 74, 12, 3044);
    			attr_dev(div2, "class", "links svelte-dadaeb");
    			add_location(div2, file$e, 71, 8, 2798);
    			attr_dev(div3, "class", "settings-top");
    			add_location(div3, file$e, 25, 4, 966);
    			set_style(div4, "z-index", "0");
    			attr_dev(div4, "class", "outer svelte-dadaeb");
    			add_location(div4, file$e, 24, 0, 922);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div4, anchor);
    			append_dev(div4, div3);
    			append_dev(div3, h3);
    			append_dev(div3, t1);
    			append_dev(div3, div0);
    			mount_component(setting0, div0, null);
    			append_dev(div3, t2);
    			append_dev(div3, div1);
    			mount_component(setting1, div1, null);
    			append_dev(div3, t3);
    			mount_component(setting2, div3, null);
    			append_dev(div3, t4);
    			mount_component(setting3, div3, null);
    			append_dev(div3, t5);
    			mount_component(setting4, div3, null);
    			append_dev(div3, t6);
    			append_dev(div3, div2);
    			append_dev(div2, a0);
    			append_dev(div2, t8);
    			append_dev(div2, span);
    			append_dev(div2, t10);
    			append_dev(div2, a1);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(div0, "click", /*click_handler*/ ctx[7], false, false, false),
    					listen_dev(div1, "click", /*click_handler_1*/ ctx[9], false, false, false),
    					listen_dev(span, "click", /*click_handler_2*/ ctx[13], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			const setting0_changes = {};
    			if (dirty & /*state*/ 1) setting0_changes.disabled = /*state*/ ctx[0].guesses !== 0;

    			if (dirty & /*$$scope*/ 16384) {
    				setting0_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_value && dirty & /*state*/ 1) {
    				updating_value = true;
    				setting0_changes.value = /*state*/ ctx[0].foodOnly;
    				add_flush_callback(() => updating_value = false);
    			}

    			setting0.$set(setting0_changes);
    			const setting1_changes = {};
    			if (dirty & /*state*/ 1) setting1_changes.disabled = !/*state*/ ctx[0].validHard;

    			if (dirty & /*$$scope*/ 16384) {
    				setting1_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_value_1 && dirty & /*$settings, $mode*/ 6) {
    				updating_value_1 = true;
    				setting1_changes.value = /*$settings*/ ctx[1].hard[/*$mode*/ ctx[2]];
    				add_flush_callback(() => updating_value_1 = false);
    			}

    			setting1.$set(setting1_changes);
    			const setting2_changes = {};

    			if (dirty & /*$$scope*/ 16384) {
    				setting2_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_value_2 && dirty & /*$settings*/ 2) {
    				updating_value_2 = true;
    				setting2_changes.value = /*$settings*/ ctx[1].dark;
    				add_flush_callback(() => updating_value_2 = false);
    			}

    			setting2.$set(setting2_changes);
    			const setting3_changes = {};

    			if (dirty & /*$$scope*/ 16384) {
    				setting3_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_value_3 && dirty & /*$settings*/ 2) {
    				updating_value_3 = true;
    				setting3_changes.value = /*$settings*/ ctx[1].colorblind;
    				add_flush_callback(() => updating_value_3 = false);
    			}

    			setting3.$set(setting3_changes);
    			const setting4_changes = {};

    			if (dirty & /*$$scope*/ 16384) {
    				setting4_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_value_4 && dirty & /*$mode*/ 4) {
    				updating_value_4 = true;
    				setting4_changes.value = /*$mode*/ ctx[2];
    				add_flush_callback(() => updating_value_4 = false);
    			}

    			setting4.$set(setting4_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(setting0.$$.fragment, local);
    			transition_in(setting1.$$.fragment, local);
    			transition_in(setting2.$$.fragment, local);
    			transition_in(setting3.$$.fragment, local);
    			transition_in(setting4.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(setting0.$$.fragment, local);
    			transition_out(setting1.$$.fragment, local);
    			transition_out(setting2.$$.fragment, local);
    			transition_out(setting3.$$.fragment, local);
    			transition_out(setting4.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div4);
    			destroy_component(setting0);
    			destroy_component(setting1);
    			destroy_component(setting2);
    			destroy_component(setting3);
    			destroy_component(setting4);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$g.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const func = e => e.name;

    function instance$g($$self, $$props, $$invalidate) {
    	let $settings;
    	let $mode;
    	validate_store(settings, 'settings');
    	component_subscribe($$self, settings, $$value => $$invalidate(1, $settings = $$value));
    	validate_store(mode, 'mode');
    	component_subscribe($$self, mode, $$value => $$invalidate(2, $mode = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Settings', slots, []);
    	let { state } = $$props;
    	const toaster = getContext("toaster");
    	let root;
    	const dispatch = createEventDispatcher();

    	onMount(() => {
    		$$invalidate(5, root = document.documentElement);
    	});

    	const writable_props = ['state'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Settings> was created with unknown prop '${key}'`);
    	});

    	function setting0_value_binding(value) {
    		if ($$self.$$.not_equal(state.foodOnly, value)) {
    			state.foodOnly = value;
    			$$invalidate(0, state);
    		}
    	}

    	const click_handler = () => {
    		CheckFoodMode(state);

    		if (state.guesses) {
    			if (state.foodOnly) {
    				return toaster.pop("You cannot turn off food mode after you already started playing");
    			}

    			return toaster.pop('You cannot turn on food only mode after you already started playing');
    		}
    	};

    	function setting1_value_binding(value) {
    		if ($$self.$$.not_equal($settings.hard[$mode], value)) {
    			$settings.hard[$mode] = value;
    			settings.set($settings);
    		}
    	}

    	const click_handler_1 = () => {
    		if (!state.validHard) {
    			toaster.pop("Game has already violated hard mode");
    		}
    	};

    	function setting2_value_binding(value) {
    		if ($$self.$$.not_equal($settings.dark, value)) {
    			$settings.dark = value;
    			settings.set($settings);
    		}
    	}

    	function setting3_value_binding(value) {
    		if ($$self.$$.not_equal($settings.colorblind, value)) {
    			$settings.colorblind = value;
    			settings.set($settings);
    		}
    	}

    	function setting4_value_binding(value) {
    		$mode = value;
    		mode.set($mode);
    	}

    	const click_handler_2 = () => dispatch("contact");

    	$$self.$$set = $$props => {
    		if ('state' in $$props) $$invalidate(0, state = $$props.state);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		getContext,
    		onMount,
    		mode,
    		settings,
    		CheckFoodMode,
    		modeData,
    		Setting,
    		state,
    		toaster,
    		root,
    		dispatch,
    		$settings,
    		$mode
    	});

    	$$self.$inject_state = $$props => {
    		if ('state' in $$props) $$invalidate(0, state = $$props.state);
    		if ('root' in $$props) $$invalidate(5, root = $$props.root);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*root, $settings*/ 34) {
    			{
    				if (root) {
    					$settings.dark
    					? root.classList.remove("light")
    					: root.classList.add("light");

    					$settings.colorblind
    					? root.classList.add("colorblind")
    					: root.classList.remove("colorblind");

    					localStorage.setItem("settings", JSON.stringify($settings));
    				}
    			}
    		}
    	};

    	return [
    		state,
    		$settings,
    		$mode,
    		toaster,
    		dispatch,
    		root,
    		setting0_value_binding,
    		click_handler,
    		setting1_value_binding,
    		click_handler_1,
    		setting2_value_binding,
    		setting3_value_binding,
    		setting4_value_binding,
    		click_handler_2
    	];
    }

    class Settings extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$g, create_fragment$g, safe_not_equal, { state: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Settings",
    			options,
    			id: create_fragment$g.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*state*/ ctx[0] === undefined && !('state' in props)) {
    			console.warn("<Settings> was created without expected prop 'state'");
    		}
    	}

    	get state() {
    		throw new Error("<Settings>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set state(value) {
    		throw new Error("<Settings>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\widgets\Seperator.svelte generated by Svelte v3.46.4 */

    const file$d = "src\\components\\widgets\\Seperator.svelte";
    const get__2_slot_changes = dirty => ({});
    const get__2_slot_context = ctx => ({});
    const get__1_slot_changes = dirty => ({});
    const get__1_slot_context = ctx => ({});

    function create_fragment$f(ctx) {
    	let div2;
    	let div0;
    	let t;
    	let div1;
    	let current;
    	const _1_slot_template = /*#slots*/ ctx[2]["1"];
    	const _1_slot = create_slot(_1_slot_template, ctx, /*$$scope*/ ctx[1], get__1_slot_context);
    	const _2_slot_template = /*#slots*/ ctx[2]["2"];
    	const _2_slot = create_slot(_2_slot_template, ctx, /*$$scope*/ ctx[1], get__2_slot_context);

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			if (_1_slot) _1_slot.c();
    			t = space();
    			div1 = element("div");
    			if (_2_slot) _2_slot.c();
    			attr_dev(div0, "class", "svelte-1xuhjgi");
    			add_location(div0, file$d, 4, 1, 93);
    			attr_dev(div1, "class", "svelte-1xuhjgi");
    			add_location(div1, file$d, 7, 1, 131);
    			attr_dev(div2, "class", "sep svelte-1xuhjgi");
    			toggle_class(div2, "visible", /*visible*/ ctx[0]);
    			add_location(div2, file$d, 3, 0, 59);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);

    			if (_1_slot) {
    				_1_slot.m(div0, null);
    			}

    			append_dev(div2, t);
    			append_dev(div2, div1);

    			if (_2_slot) {
    				_2_slot.m(div1, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (_1_slot) {
    				if (_1_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						_1_slot,
    						_1_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(_1_slot_template, /*$$scope*/ ctx[1], dirty, get__1_slot_changes),
    						get__1_slot_context
    					);
    				}
    			}

    			if (_2_slot) {
    				if (_2_slot.p && (!current || dirty & /*$$scope*/ 2)) {
    					update_slot_base(
    						_2_slot,
    						_2_slot_template,
    						ctx,
    						/*$$scope*/ ctx[1],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[1])
    						: get_slot_changes(_2_slot_template, /*$$scope*/ ctx[1], dirty, get__2_slot_changes),
    						get__2_slot_context
    					);
    				}
    			}

    			if (dirty & /*visible*/ 1) {
    				toggle_class(div2, "visible", /*visible*/ ctx[0]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(_1_slot, local);
    			transition_in(_2_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(_1_slot, local);
    			transition_out(_2_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			if (_1_slot) _1_slot.d(detaching);
    			if (_2_slot) _2_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$f.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$f($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Seperator', slots, ['1','2']);
    	let { visible = true } = $$props;
    	const writable_props = ['visible'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Seperator> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('visible' in $$props) $$invalidate(0, visible = $$props.visible);
    		if ('$$scope' in $$props) $$invalidate(1, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ visible });

    	$$self.$inject_state = $$props => {
    		if ('visible' in $$props) $$invalidate(0, visible = $$props.visible);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [visible, $$scope, slots];
    }

    class Seperator extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$f, create_fragment$f, safe_not_equal, { visible: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Seperator",
    			options,
    			id: create_fragment$f.name
    		});
    	}

    	get visible() {
    		throw new Error("<Seperator>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set visible(value) {
    		throw new Error("<Seperator>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\widgets\Share.svelte generated by Svelte v3.46.4 */
    const file$c = "src\\components\\widgets\\Share.svelte";

    function create_fragment$e(ctx) {
    	let div;
    	let t;
    	let svg;
    	let path;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text("share\r\n    ");
    			svg = svg_element("svg");
    			path = svg_element("path");
    			attr_dev(path, "d", "M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z");
    			attr_dev(path, "fill", "white");
    			add_location(path, file$c, 19, 8, 697);
    			attr_dev(svg, "height", "24");
    			attr_dev(svg, "viewBox", "0 0 24 24");
    			attr_dev(svg, "width", "24");
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			add_location(svg, file$c, 18, 4, 604);
    			attr_dev(div, "class", "svelte-gyq5p4");
    			add_location(div, file$c, 11, 0, 481);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    			append_dev(div, svg);
    			append_dev(svg, path);

    			if (!mounted) {
    				dispose = listen_dev(div, "click", /*click_handler*/ ctx[4], false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$e.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$e($$self, $$props, $$invalidate) {
    	let stats;
    	let $mode;
    	validate_store(mode, 'mode');
    	component_subscribe($$self, mode, $$value => $$invalidate(3, $mode = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Share', slots, []);
    	let { state } = $$props;
    	const toaster = getContext("toaster");
    	const writable_props = ['state'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Share> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => {
    		navigator.clipboard.writeText(stats);
    		toaster.pop("Copied");
    	};

    	$$self.$$set = $$props => {
    		if ('state' in $$props) $$invalidate(2, state = $$props.state);
    	};

    	$$self.$capture_state = () => ({
    		mode,
    		failed,
    		modeData,
    		getContext,
    		state,
    		toaster,
    		stats,
    		$mode
    	});

    	$$self.$inject_state = $$props => {
    		if ('state' in $$props) $$invalidate(2, state = $$props.state);
    		if ('stats' in $$props) $$invalidate(0, stats = $$props.stats);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$mode, state*/ 12) {
    			$$invalidate(0, stats = `${modeData.modes[$mode].name} Foodle #${state.wordNumber} ${failed(state) ? "X" : state.guesses}/${state.board.words.length}\n\n    ${state.board.state.slice(0, state.guesses).map(r => r.join("")).join("\n    ")}\nnasoj.me/foodle/`);
    		}
    	};

    	return [stats, toaster, state, $mode, click_handler];
    }

    class Share extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$e, create_fragment$e, safe_not_equal, { state: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Share",
    			options,
    			id: create_fragment$e.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*state*/ ctx[2] === undefined && !('state' in props)) {
    			console.warn("<Share> was created without expected prop 'state'");
    		}
    	}

    	get state() {
    		throw new Error("<Share>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set state(value) {
    		throw new Error("<Share>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\widgets\Tutorial.svelte generated by Svelte v3.46.4 */
    const file$b = "src\\components\\widgets\\Tutorial.svelte";

    function create_fragment$d(ctx) {
    	let h1;
    	let t1;
    	let div0;
    	let t2;
    	let strong0;
    	let t4;
    	let t5;
    	let t6;
    	let t7;
    	let div1;
    	let t11;
    	let div2;
    	let t13;
    	let div10;
    	let div3;
    	let strong1;
    	let t15;
    	let div4;
    	let tile0;
    	let t16;
    	let tile1;
    	let t17;
    	let tile2;
    	let t18;
    	let tile3;
    	let t19;
    	let tile4;
    	let t20;
    	let div5;
    	let t21;
    	let strong2;
    	let t23;
    	let t24;
    	let div6;
    	let tile5;
    	let t25;
    	let tile6;
    	let t26;
    	let tile7;
    	let t27;
    	let tile8;
    	let t28;
    	let tile9;
    	let t29;
    	let div7;
    	let t30;
    	let strong3;
    	let t32;
    	let t33;
    	let div8;
    	let tile10;
    	let t34;
    	let tile11;
    	let t35;
    	let tile12;
    	let t36;
    	let tile13;
    	let t37;
    	let tile14;
    	let t38;
    	let div9;
    	let t39;
    	let strong4;
    	let t41;
    	let t42;
    	let div11;
    	let t43;
    	let a0;
    	let t45;
    	let br0;
    	let t46;
    	let span0;
    	let t48;
    	let a1;
    	let t50;
    	let a2;
    	let t52;
    	let br1;
    	let t53;
    	let a3;
    	let t55;
    	let span1;
    	let current;
    	let mounted;
    	let dispose;

    	tile0 = new Tile({
    			props: { value: "T", state: "🟩" },
    			$$inline: true
    		});

    	tile1 = new Tile({
    			props: { value: "a", state: "🔳" },
    			$$inline: true
    		});

    	tile2 = new Tile({
    			props: { value: "c", state: "🔳" },
    			$$inline: true
    		});

    	tile3 = new Tile({
    			props: { value: "o", state: "🔳" },
    			$$inline: true
    		});

    	tile4 = new Tile({
    			props: { value: "s", state: "🔳" },
    			$$inline: true
    		});

    	tile5 = new Tile({
    			props: { value: "p", state: "🔳" },
    			$$inline: true
    		});

    	tile6 = new Tile({
    			props: { value: "i", state: "🟨" },
    			$$inline: true
    		});

    	tile7 = new Tile({
    			props: { value: "z", state: "🔳" },
    			$$inline: true
    		});

    	tile8 = new Tile({
    			props: { value: "z", state: "🔳" },
    			$$inline: true
    		});

    	tile9 = new Tile({
    			props: { value: "a", state: "🔳" },
    			$$inline: true
    		});

    	tile10 = new Tile({
    			props: { value: "b", state: "🔳" },
    			$$inline: true
    		});

    	tile11 = new Tile({
    			props: { value: "r", state: "🔳" },
    			$$inline: true
    		});

    	tile12 = new Tile({
    			props: { value: "e", state: "🔳" },
    			$$inline: true
    		});

    	tile13 = new Tile({
    			props: { value: "a", state: "🔳" },
    			$$inline: true
    		});

    	tile14 = new Tile({
    			props: { value: "d", state: "⬛" },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "how to play";
    			t1 = space();
    			div0 = element("div");
    			t2 = text("Guess the ");
    			strong0 = element("strong");
    			strong0.textContent = "FOODLE";
    			t4 = text(" in ");
    			t5 = text(ROWS);
    			t6 = text(" tries.");
    			t7 = space();
    			div1 = element("div");
    			div1.textContent = `Each guess must be a valid ${COLS} letter word. Hit the enter button to submit.`;
    			t11 = space();
    			div2 = element("div");
    			div2.textContent = "After each guess, the color of the tiles will change to show how close your guess was to the\r\n\tword.";
    			t13 = space();
    			div10 = element("div");
    			div3 = element("div");
    			strong1 = element("strong");
    			strong1.textContent = "Examples";
    			t15 = space();
    			div4 = element("div");
    			create_component(tile0.$$.fragment);
    			t16 = space();
    			create_component(tile1.$$.fragment);
    			t17 = space();
    			create_component(tile2.$$.fragment);
    			t18 = space();
    			create_component(tile3.$$.fragment);
    			t19 = space();
    			create_component(tile4.$$.fragment);
    			t20 = space();
    			div5 = element("div");
    			t21 = text("The letter ");
    			strong2 = element("strong");
    			strong2.textContent = "T";
    			t23 = text(" is in the word and in the correct spot.");
    			t24 = space();
    			div6 = element("div");
    			create_component(tile5.$$.fragment);
    			t25 = space();
    			create_component(tile6.$$.fragment);
    			t26 = space();
    			create_component(tile7.$$.fragment);
    			t27 = space();
    			create_component(tile8.$$.fragment);
    			t28 = space();
    			create_component(tile9.$$.fragment);
    			t29 = space();
    			div7 = element("div");
    			t30 = text("The letter ");
    			strong3 = element("strong");
    			strong3.textContent = "I";
    			t32 = text(" is in the word but in the wrong spot.");
    			t33 = space();
    			div8 = element("div");
    			create_component(tile10.$$.fragment);
    			t34 = space();
    			create_component(tile11.$$.fragment);
    			t35 = space();
    			create_component(tile12.$$.fragment);
    			t36 = space();
    			create_component(tile13.$$.fragment);
    			t37 = space();
    			create_component(tile14.$$.fragment);
    			t38 = space();
    			div9 = element("div");
    			t39 = text("The letter ");
    			strong4 = element("strong");
    			strong4.textContent = "D";
    			t41 = text(" is not in the word in any spot.");
    			t42 = space();
    			div11 = element("div");
    			t43 = text("This is a recreation of the original ");
    			a0 = element("a");
    			a0.textContent = "Wordle";
    			t45 = text("\r\n\r\n\r\n\tby Josh Wardle with a different theme and additional modes and features.\r\n\t");
    			br0 = element("br");
    			t46 = text("\r\n\tPlease ");
    			span0 = element("span");
    			span0.textContent = "contact";
    			t48 = text(" the developer\r\n\t");
    			a1 = element("a");
    			a1.textContent = "Jason";
    			t50 = text(".\r\n\tif you have any problems. Or find us on ");
    			a2 = element("a");
    			a2.textContent = "Twitter";
    			t52 = space();
    			br1 = element("br");
    			t53 = text("\r\n\tOpen the settings menu to see some of the additional features.\r\n\tOr click\r\n\t");
    			a3 = element("a");
    			a3.textContent = "Here to go home.";
    			t55 = text("\r\n\tOr view the ");
    			span1 = element("span");
    			span1.textContent = "ChangeLog.";
    			attr_dev(h1, "class", "svelte-9t2w55");
    			add_location(h1, file$b, 7, 0, 221);
    			attr_dev(strong0, "class", "svelte-9t2w55");
    			add_location(strong0, file$b, 8, 15, 258);
    			attr_dev(div0, "class", "svelte-9t2w55");
    			add_location(div0, file$b, 8, 0, 243);
    			attr_dev(div1, "class", "svelte-9t2w55");
    			add_location(div1, file$b, 9, 0, 306);
    			attr_dev(div2, "class", "svelte-9t2w55");
    			add_location(div2, file$b, 10, 0, 397);
    			attr_dev(strong1, "class", "svelte-9t2w55");
    			add_location(strong1, file$b, 15, 6, 570);
    			attr_dev(div3, "class", "svelte-9t2w55");
    			add_location(div3, file$b, 15, 1, 565);
    			attr_dev(div4, "class", "row svelte-9t2w55");
    			add_location(div4, file$b, 16, 1, 604);
    			attr_dev(strong2, "class", "svelte-9t2w55");
    			add_location(strong2, file$b, 23, 17, 814);
    			attr_dev(div5, "class", "svelte-9t2w55");
    			add_location(div5, file$b, 23, 1, 798);
    			attr_dev(div6, "class", "row svelte-9t2w55");
    			add_location(div6, file$b, 24, 1, 881);
    			attr_dev(strong3, "class", "svelte-9t2w55");
    			add_location(strong3, file$b, 31, 17, 1091);
    			attr_dev(div7, "class", "svelte-9t2w55");
    			add_location(div7, file$b, 31, 1, 1075);
    			attr_dev(div8, "class", "row svelte-9t2w55");
    			add_location(div8, file$b, 32, 1, 1156);
    			attr_dev(strong4, "class", "svelte-9t2w55");
    			add_location(strong4, file$b, 39, 17, 1360);
    			attr_dev(div9, "class", "svelte-9t2w55");
    			add_location(div9, file$b, 39, 1, 1344);
    			attr_dev(div10, "class", "examples svelte-9t2w55");
    			toggle_class(div10, "complete", /*visible*/ ctx[0]);
    			add_location(div10, file$b, 14, 0, 515);
    			attr_dev(a0, "href", "https://www.nytimes.com/games/wordle/");
    			attr_dev(a0, "target", "_blank");
    			attr_dev(a0, "class", "svelte-9t2w55");
    			add_location(a0, file$b, 42, 38, 1471);
    			attr_dev(br0, "class", "svelte-9t2w55");
    			add_location(br0, file$b, 49, 1, 1635);
    			set_style(span0, "text-decoration", "underline");
    			attr_dev(span0, "class", "svelte-9t2w55");
    			add_location(span0, file$b, 50, 8, 1650);
    			attr_dev(a1, "href", "https://github.com/JasonLovesDoggo");
    			attr_dev(a1, "target", "_blank");
    			attr_dev(a1, "class", "svelte-9t2w55");
    			add_location(a1, file$b, 51, 1, 1760);
    			attr_dev(a2, "class", "social_link twitter svelte-9t2w55");
    			attr_dev(a2, "href", "https://twitter.com/FoodleTheGame");
    			add_location(a2, file$b, 52, 41, 1874);
    			attr_dev(br1, "class", "svelte-9t2w55");
    			add_location(br1, file$b, 53, 1, 1960);
    			attr_dev(a3, "href", "https://nasoj.me/");
    			attr_dev(a3, "target", "_blank");
    			attr_dev(a3, "class", "svelte-9t2w55");
    			add_location(a3, file$b, 56, 1, 2044);
    			set_style(span1, "text-decoration", "underline");
    			attr_dev(span1, "class", "svelte-9t2w55");
    			add_location(span1, file$b, 57, 13, 2123);
    			attr_dev(div11, "class", "svelte-9t2w55");
    			add_location(div11, file$b, 41, 0, 1426);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div0, anchor);
    			append_dev(div0, t2);
    			append_dev(div0, strong0);
    			append_dev(div0, t4);
    			append_dev(div0, t5);
    			append_dev(div0, t6);
    			insert_dev(target, t7, anchor);
    			insert_dev(target, div1, anchor);
    			insert_dev(target, t11, anchor);
    			insert_dev(target, div2, anchor);
    			insert_dev(target, t13, anchor);
    			insert_dev(target, div10, anchor);
    			append_dev(div10, div3);
    			append_dev(div3, strong1);
    			append_dev(div10, t15);
    			append_dev(div10, div4);
    			mount_component(tile0, div4, null);
    			append_dev(div4, t16);
    			mount_component(tile1, div4, null);
    			append_dev(div4, t17);
    			mount_component(tile2, div4, null);
    			append_dev(div4, t18);
    			mount_component(tile3, div4, null);
    			append_dev(div4, t19);
    			mount_component(tile4, div4, null);
    			append_dev(div10, t20);
    			append_dev(div10, div5);
    			append_dev(div5, t21);
    			append_dev(div5, strong2);
    			append_dev(div5, t23);
    			append_dev(div10, t24);
    			append_dev(div10, div6);
    			mount_component(tile5, div6, null);
    			append_dev(div6, t25);
    			mount_component(tile6, div6, null);
    			append_dev(div6, t26);
    			mount_component(tile7, div6, null);
    			append_dev(div6, t27);
    			mount_component(tile8, div6, null);
    			append_dev(div6, t28);
    			mount_component(tile9, div6, null);
    			append_dev(div10, t29);
    			append_dev(div10, div7);
    			append_dev(div7, t30);
    			append_dev(div7, strong3);
    			append_dev(div7, t32);
    			append_dev(div10, t33);
    			append_dev(div10, div8);
    			mount_component(tile10, div8, null);
    			append_dev(div8, t34);
    			mount_component(tile11, div8, null);
    			append_dev(div8, t35);
    			mount_component(tile12, div8, null);
    			append_dev(div8, t36);
    			mount_component(tile13, div8, null);
    			append_dev(div8, t37);
    			mount_component(tile14, div8, null);
    			append_dev(div10, t38);
    			append_dev(div10, div9);
    			append_dev(div9, t39);
    			append_dev(div9, strong4);
    			append_dev(div9, t41);
    			insert_dev(target, t42, anchor);
    			insert_dev(target, div11, anchor);
    			append_dev(div11, t43);
    			append_dev(div11, a0);
    			append_dev(div11, t45);
    			append_dev(div11, br0);
    			append_dev(div11, t46);
    			append_dev(div11, span0);
    			append_dev(div11, t48);
    			append_dev(div11, a1);
    			append_dev(div11, t50);
    			append_dev(div11, a2);
    			append_dev(div11, t52);
    			append_dev(div11, br1);
    			append_dev(div11, t53);
    			append_dev(div11, a3);
    			append_dev(div11, t55);
    			append_dev(div11, span1);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(span0, "click", /*click_handler*/ ctx[2], false, false, false),
    					listen_dev(span1, "click", /*click_handler_1*/ ctx[3], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*visible*/ 1) {
    				toggle_class(div10, "complete", /*visible*/ ctx[0]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(tile0.$$.fragment, local);
    			transition_in(tile1.$$.fragment, local);
    			transition_in(tile2.$$.fragment, local);
    			transition_in(tile3.$$.fragment, local);
    			transition_in(tile4.$$.fragment, local);
    			transition_in(tile5.$$.fragment, local);
    			transition_in(tile6.$$.fragment, local);
    			transition_in(tile7.$$.fragment, local);
    			transition_in(tile8.$$.fragment, local);
    			transition_in(tile9.$$.fragment, local);
    			transition_in(tile10.$$.fragment, local);
    			transition_in(tile11.$$.fragment, local);
    			transition_in(tile12.$$.fragment, local);
    			transition_in(tile13.$$.fragment, local);
    			transition_in(tile14.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(tile0.$$.fragment, local);
    			transition_out(tile1.$$.fragment, local);
    			transition_out(tile2.$$.fragment, local);
    			transition_out(tile3.$$.fragment, local);
    			transition_out(tile4.$$.fragment, local);
    			transition_out(tile5.$$.fragment, local);
    			transition_out(tile6.$$.fragment, local);
    			transition_out(tile7.$$.fragment, local);
    			transition_out(tile8.$$.fragment, local);
    			transition_out(tile9.$$.fragment, local);
    			transition_out(tile10.$$.fragment, local);
    			transition_out(tile11.$$.fragment, local);
    			transition_out(tile12.$$.fragment, local);
    			transition_out(tile13.$$.fragment, local);
    			transition_out(tile14.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div0);
    			if (detaching) detach_dev(t7);
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t11);
    			if (detaching) detach_dev(div2);
    			if (detaching) detach_dev(t13);
    			if (detaching) detach_dev(div10);
    			destroy_component(tile0);
    			destroy_component(tile1);
    			destroy_component(tile2);
    			destroy_component(tile3);
    			destroy_component(tile4);
    			destroy_component(tile5);
    			destroy_component(tile6);
    			destroy_component(tile7);
    			destroy_component(tile8);
    			destroy_component(tile9);
    			destroy_component(tile10);
    			destroy_component(tile11);
    			destroy_component(tile12);
    			destroy_component(tile13);
    			destroy_component(tile14);
    			if (detaching) detach_dev(t42);
    			if (detaching) detach_dev(div11);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$d.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$d($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Tutorial', slots, []);
    	const dispatch = createEventDispatcher();
    	let { visible } = $$props;
    	const writable_props = ['visible'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Tutorial> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => dispatch("contact");
    	const click_handler_1 = () => dispatch("changelog");

    	$$self.$$set = $$props => {
    		if ('visible' in $$props) $$invalidate(0, visible = $$props.visible);
    	};

    	$$self.$capture_state = () => ({
    		COLS,
    		ROWS,
    		Tile,
    		createEventDispatcher,
    		dispatch,
    		visible
    	});

    	$$self.$inject_state = $$props => {
    		if ('visible' in $$props) $$invalidate(0, visible = $$props.visible);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [visible, dispatch, click_handler, click_handler_1];
    }

    class Tutorial extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$d, create_fragment$d, safe_not_equal, { visible: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Tutorial",
    			options,
    			id: create_fragment$d.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*visible*/ ctx[0] === undefined && !('visible' in props)) {
    			console.warn("<Tutorial> was created without expected prop 'visible'");
    		}
    	}

    	get visible() {
    		throw new Error("<Tutorial>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set visible(value) {
    		throw new Error("<Tutorial>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\widgets\Contact.svelte generated by Svelte v3.46.4 */

    const file$a = "src\\components\\widgets\\Contact.svelte";

    function create_fragment$c(ctx) {
    	let div3;
    	let h1;
    	let t1;
    	let div0;
    	let a0;
    	let t3;
    	let a1;
    	let t5;
    	let br0;
    	let t6;
    	let form;
    	let label0;
    	let t8;
    	let input0;
    	let t9;
    	let label1;
    	let t11;
    	let input1;
    	let t12;
    	let label2;
    	let t14;
    	let input2;
    	let t15;
    	let label3;
    	let t17;
    	let select;
    	let option0;
    	let option1;
    	let option2;
    	let option3;
    	let t22;
    	let label4;
    	let t24;
    	let textarea;
    	let t25;
    	let div1;
    	let t26;
    	let input3;
    	let t27;
    	let input4;
    	let t28;
    	let br1;
    	let t29;
    	let div2;
    	let p;
    	let t30;
    	let a2;
    	let t32;
    	let a3;
    	let t34;

    	const block = {
    		c: function create() {
    			div3 = element("div");
    			h1 = element("h1");
    			h1.textContent = "Contact Me";
    			t1 = space();
    			div0 = element("div");
    			a0 = element("a");
    			a0.textContent = "Twitter";
    			t3 = space();
    			a1 = element("a");
    			a1.textContent = "Github";
    			t5 = space();
    			br0 = element("br");
    			t6 = space();
    			form = element("form");
    			label0 = element("label");
    			label0.textContent = "First Name";
    			t8 = space();
    			input0 = element("input");
    			t9 = space();
    			label1 = element("label");
    			label1.textContent = "Last Name";
    			t11 = space();
    			input1 = element("input");
    			t12 = space();
    			label2 = element("label");
    			label2.textContent = "Email";
    			t14 = space();
    			input2 = element("input");
    			t15 = space();
    			label3 = element("label");
    			label3.textContent = "Issue Type";
    			t17 = space();
    			select = element("select");
    			option0 = element("option");
    			option0.textContent = "Select";
    			option1 = element("option");
    			option1.textContent = "Bug Report";
    			option2 = element("option");
    			option2.textContent = "Missing Word";
    			option3 = element("option");
    			option3.textContent = "Other";
    			t22 = space();
    			label4 = element("label");
    			label4.textContent = "Message";
    			t24 = space();
    			textarea = element("textarea");
    			t25 = space();
    			div1 = element("div");
    			t26 = space();
    			input3 = element("input");
    			t27 = space();
    			input4 = element("input");
    			t28 = space();
    			br1 = element("br");
    			t29 = space();
    			div2 = element("div");
    			p = element("p");
    			t30 = text("This site is protected by reCAPTCHA and the Google ");
    			a2 = element("a");
    			a2.textContent = "Privacy\r\n            Policy";
    			t32 = text(" and ");
    			a3 = element("a");
    			a3.textContent = "Terms of Service";
    			t34 = text(" apply.");
    			attr_dev(h1, "class", "svelte-v6sdqb");
    			add_location(h1, file$a, 4, 4, 119);
    			attr_dev(a0, "class", "twitter svelte-v6sdqb");
    			attr_dev(a0, "href", "https://twitter.com/FoodleTheGame");
    			set_style(a0, "font-size", "20px");
    			add_location(a0, file$a, 6, 8, 179);
    			attr_dev(a1, "href", "https://github.com/JasonLovesDoggo/JasonLovesDoggo.github.io/issues/new");
    			set_style(a1, "font-size", "20px");
    			attr_dev(a1, "class", "svelte-v6sdqb");
    			add_location(a1, file$a, 7, 8, 284);
    			attr_dev(div0, "id", "link_container");
    			attr_dev(div0, "class", "svelte-v6sdqb");
    			add_location(div0, file$a, 5, 4, 144);
    			attr_dev(br0, "class", "svelte-v6sdqb");
    			add_location(br0, file$a, 10, 4, 430);
    			attr_dev(label0, "for", "fname");
    			attr_dev(label0, "class", "svelte-v6sdqb");
    			add_location(label0, file$a, 12, 8, 554);
    			attr_dev(input0, "type", "text");
    			attr_dev(input0, "id", "fname");
    			attr_dev(input0, "name", "First name");
    			attr_dev(input0, "placeholder", "Jason");
    			input0.required = true;
    			attr_dev(input0, "class", "svelte-v6sdqb");
    			add_location(input0, file$a, 13, 8, 601);
    			attr_dev(label1, "for", "lname");
    			attr_dev(label1, "class", "svelte-v6sdqb");
    			add_location(label1, file$a, 15, 8, 690);
    			attr_dev(input1, "id", "lname");
    			attr_dev(input1, "name", "Last name");
    			attr_dev(input1, "placeholder", "Cameron ");
    			input1.required = true;
    			attr_dev(input1, "type", "text");
    			attr_dev(input1, "class", "svelte-v6sdqb");
    			add_location(input1, file$a, 16, 8, 736);
    			attr_dev(label2, "for", "email");
    			attr_dev(label2, "class", "svelte-v6sdqb");
    			add_location(label2, file$a, 18, 8, 827);
    			attr_dev(input2, "type", "email");
    			attr_dev(input2, "id", "email");
    			attr_dev(input2, "name", "Email");
    			attr_dev(input2, "placeholder", "foodlethegame@gmail.com");
    			input2.required = true;
    			attr_dev(input2, "class", "svelte-v6sdqb");
    			add_location(input2, file$a, 19, 8, 869);
    			attr_dev(label3, "for", "Issue-Type");
    			attr_dev(label3, "class", "svelte-v6sdqb");
    			add_location(label3, file$a, 20, 8, 970);
    			option0.__value = "";
    			option0.value = option0.__value;
    			option0.selected = "";
    			option0.disabled = "";
    			attr_dev(option0, "class", "svelte-v6sdqb");
    			add_location(option0, file$a, 22, 12, 1091);
    			option1.__value = "Bug Report";
    			option1.value = option1.__value;
    			attr_dev(option1, "class", "svelte-v6sdqb");
    			add_location(option1, file$a, 23, 12, 1161);
    			option2.__value = "Missing Word";
    			option2.value = option2.__value;
    			attr_dev(option2, "class", "svelte-v6sdqb");
    			add_location(option2, file$a, 24, 12, 1221);
    			option3.__value = "Other";
    			option3.value = option3.__value;
    			attr_dev(option3, "class", "svelte-v6sdqb");
    			add_location(option3, file$a, 25, 12, 1285);
    			attr_dev(select, "name", "Issue Type");
    			attr_dev(select, "id", "Issue-Type");
    			select.required = "";
    			attr_dev(select, "class", "svelte-v6sdqb");
    			add_location(select, file$a, 21, 8, 1023);
    			attr_dev(label4, "for", "message");
    			attr_dev(label4, "class", "svelte-v6sdqb");
    			add_location(label4, file$a, 28, 8, 1352);
    			attr_dev(textarea, "id", "message");
    			attr_dev(textarea, "name", "message");
    			attr_dev(textarea, "placeholder", "Please write a descriptive message");
    			attr_dev(textarea, "rows", "2");
    			set_style(textarea, "height", "200px");
    			attr_dev(textarea, "class", "svelte-v6sdqb");
    			add_location(textarea, file$a, 29, 8, 1398);
    			attr_dev(div1, "class", "g-recaptcha svelte-v6sdqb");
    			attr_dev(div1, "data-sitekey", "6LexoLkeAAAAAAeeRiBX2wFK7nQ1eaW68mRS2J1m");
    			add_location(div1, file$a, 30, 8, 1536);
    			attr_dev(input3, "type", "submit");
    			input3.value = "Submit";
    			attr_dev(input3, "class", "svelte-v6sdqb");
    			add_location(input3, file$a, 31, 8, 1633);
    			attr_dev(input4, "type", "reset");
    			input4.value = "Reset";
    			attr_dev(input4, "class", "svelte-v6sdqb");
    			add_location(input4, file$a, 32, 8, 1679);
    			attr_dev(br1, "class", "svelte-v6sdqb");
    			add_location(br1, file$a, 33, 8, 1723);
    			attr_dev(a2, "rel", "noopener");
    			attr_dev(a2, "aria-haspopup", "true");
    			attr_dev(a2, "target", "_blank");
    			attr_dev(a2, "href", "https://policies.google.com/privacy");
    			attr_dev(a2, "class", "svelte-v6sdqb");
    			add_location(a2, file$a, 35, 63, 1827);
    			attr_dev(a3, "rel", "noopener");
    			attr_dev(a3, "aria-haspopup", "true");
    			attr_dev(a3, "target", "_blank");
    			attr_dev(a3, "href", "https://policies.google.com/terms");
    			attr_dev(a3, "class", "svelte-v6sdqb");
    			add_location(a3, file$a, 37, 27, 2028);
    			attr_dev(p, "class", "captcha svelte-v6sdqb");
    			add_location(p, file$a, 34, 13, 1743);
    			attr_dev(div2, "class", "svelte-v6sdqb");
    			add_location(div2, file$a, 34, 8, 1738);
    			attr_dev(form, "name", "Foodle-form");
    			attr_dev(form, "accept-charset", "utf-8");
    			attr_dev(form, "action", "https://formspree.io/f/xqknbywk");
    			attr_dev(form, "method", "post");
    			attr_dev(form, "class", "svelte-v6sdqb");
    			add_location(form, file$a, 11, 4, 441);
    			attr_dev(div3, "class", "container contact-form svelte-v6sdqb");
    			toggle_class(div3, "complete", /*visible*/ ctx[0]);
    			add_location(div3, file$a, 3, 0, 52);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div3, anchor);
    			append_dev(div3, h1);
    			append_dev(div3, t1);
    			append_dev(div3, div0);
    			append_dev(div0, a0);
    			append_dev(div0, t3);
    			append_dev(div0, a1);
    			append_dev(div3, t5);
    			append_dev(div3, br0);
    			append_dev(div3, t6);
    			append_dev(div3, form);
    			append_dev(form, label0);
    			append_dev(form, t8);
    			append_dev(form, input0);
    			append_dev(form, t9);
    			append_dev(form, label1);
    			append_dev(form, t11);
    			append_dev(form, input1);
    			append_dev(form, t12);
    			append_dev(form, label2);
    			append_dev(form, t14);
    			append_dev(form, input2);
    			append_dev(form, t15);
    			append_dev(form, label3);
    			append_dev(form, t17);
    			append_dev(form, select);
    			append_dev(select, option0);
    			append_dev(select, option1);
    			append_dev(select, option2);
    			append_dev(select, option3);
    			append_dev(form, t22);
    			append_dev(form, label4);
    			append_dev(form, t24);
    			append_dev(form, textarea);
    			append_dev(form, t25);
    			append_dev(form, div1);
    			append_dev(form, t26);
    			append_dev(form, input3);
    			append_dev(form, t27);
    			append_dev(form, input4);
    			append_dev(form, t28);
    			append_dev(form, br1);
    			append_dev(form, t29);
    			append_dev(form, div2);
    			append_dev(div2, p);
    			append_dev(p, t30);
    			append_dev(p, a2);
    			append_dev(p, t32);
    			append_dev(p, a3);
    			append_dev(p, t34);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*visible*/ 1) {
    				toggle_class(div3, "complete", /*visible*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div3);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$c.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$c($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Contact', slots, []);
    	let { visible } = $$props;
    	const writable_props = ['visible'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Contact> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('visible' in $$props) $$invalidate(0, visible = $$props.visible);
    	};

    	$$self.$capture_state = () => ({ visible });

    	$$self.$inject_state = $$props => {
    		if ('visible' in $$props) $$invalidate(0, visible = $$props.visible);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [visible];
    }

    class Contact extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$c, create_fragment$c, safe_not_equal, { visible: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Contact",
    			options,
    			id: create_fragment$c.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*visible*/ ctx[0] === undefined && !('visible' in props)) {
    			console.warn("<Contact> was created without expected prop 'visible'");
    		}
    	}

    	get visible() {
    		throw new Error("<Contact>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set visible(value) {
    		throw new Error("<Contact>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\widgets\ChangeLog.svelte generated by Svelte v3.46.4 */

    const { Error: Error_1$1 } = globals;
    const file$9 = "src\\components\\widgets\\ChangeLog.svelte";

    function get_each_context$4(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[8] = list[i];
    	return child_ctx;
    }

    // (54:4) {:catch s}
    function create_catch_block(ctx) {
    	let div;
    	let h2;
    	let t0;
    	let a;
    	let t1;

    	const block = {
    		c: function create() {
    			div = element("div");
    			h2 = element("h2");
    			t0 = text("Failed to fetch the changelog but you can ");
    			a = element("a");
    			t1 = text("view it on GitHub");
    			attr_dev(a, "target", "_blank");
    			attr_dev(a, "href", /*githuburl*/ ctx[1]);
    			attr_dev(a, "class", "svelte-1u4vbja");
    			add_location(a, file$9, 54, 60, 1865);
    			attr_dev(h2, "class", "svelte-1u4vbja");
    			add_location(h2, file$9, 54, 13, 1818);
    			attr_dev(div, "class", "svelte-1u4vbja");
    			add_location(div, file$9, 54, 8, 1813);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, h2);
    			append_dev(h2, t0);
    			append_dev(h2, a);
    			append_dev(a, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*githuburl*/ 2) {
    				attr_dev(a, "href", /*githuburl*/ ctx[1]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_catch_block.name,
    		type: "catch",
    		source: "(54:4) {:catch s}",
    		ctx
    	});

    	return block;
    }

    // (39:4) {:then json}
    function create_then_block(ctx) {
    	let if_block_anchor;
    	let if_block = /*errormsg*/ ctx[3] !== '' && create_if_block$6(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (/*errormsg*/ ctx[3] !== '') if_block.p(ctx, dirty);
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_then_block.name,
    		type: "then",
    		source: "(39:4) {:then json}",
    		ctx
    	});

    	return block;
    }

    // (40:8) {#if errormsg !== ''}
    function create_if_block$6(ctx) {
    	let h1;
    	let t0;
    	let t1_value = /*json*/ ctx[2]['version'] + "";
    	let t1;
    	let t2;
    	let h20;
    	let t3_value = /*json*/ ctx[2]['title'] + "";
    	let t3;
    	let t4;
    	let h3;
    	let t6;
    	let ul;
    	let t7;
    	let h21;
    	let a;
    	let t8;
    	let each_value = /*json*/ ctx[2]['changes'];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			t0 = text("Foodle ");
    			t1 = text(t1_value);
    			t2 = space();
    			h20 = element("h2");
    			t3 = text(t3_value);
    			t4 = space();
    			h3 = element("h3");
    			h3.textContent = "Updates";
    			t6 = space();
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t7 = space();
    			h21 = element("h2");
    			a = element("a");
    			t8 = text("View on GitHub");
    			set_style(h1, "padding-bottom", "7%");
    			attr_dev(h1, "class", "center svelte-1u4vbja");
    			add_location(h1, file$9, 41, 12, 1268);
    			attr_dev(h20, "class", "svelte-1u4vbja");
    			add_location(h20, file$9, 42, 12, 1358);
    			attr_dev(h3, "class", "margind svelte-1u4vbja");
    			set_style(h3, "text-align", "revert");
    			add_location(h3, file$9, 43, 12, 1396);
    			attr_dev(ul, "class", "margind svelte-1u4vbja");
    			add_location(ul, file$9, 44, 12, 1469);
    			attr_dev(a, "target", "_blank");
    			attr_dev(a, "href", /*githuburl*/ ctx[1]);
    			attr_dev(a, "class", "svelte-1u4vbja");
    			add_location(a, file$9, 49, 56, 1697);
    			set_style(h21, "padding-top", "4%");
    			attr_dev(h21, "class", "center svelte-1u4vbja");
    			add_location(h21, file$9, 49, 12, 1653);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    			append_dev(h1, t0);
    			append_dev(h1, t1);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, h20, anchor);
    			append_dev(h20, t3);
    			insert_dev(target, t4, anchor);
    			insert_dev(target, h3, anchor);
    			insert_dev(target, t6, anchor);
    			insert_dev(target, ul, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}

    			insert_dev(target, t7, anchor);
    			insert_dev(target, h21, anchor);
    			append_dev(h21, a);
    			append_dev(a, t8);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*GetLatestVersion*/ 16) {
    				each_value = /*json*/ ctx[2]['changes'];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$4(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$4(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ul, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (dirty & /*githuburl*/ 2) {
    				attr_dev(a, "href", /*githuburl*/ ctx[1]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(h20);
    			if (detaching) detach_dev(t4);
    			if (detaching) detach_dev(h3);
    			if (detaching) detach_dev(t6);
    			if (detaching) detach_dev(ul);
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(t7);
    			if (detaching) detach_dev(h21);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$6.name,
    		type: "if",
    		source: "(40:8) {#if errormsg !== ''}",
    		ctx
    	});

    	return block;
    }

    // (46:16) {#each json['changes'] as change}
    function create_each_block$4(ctx) {
    	let li;
    	let t_value = /*change*/ ctx[8] + "";
    	let t;

    	const block = {
    		c: function create() {
    			li = element("li");
    			t = text(t_value);
    			attr_dev(li, "class", "margind svelte-1u4vbja");
    			add_location(li, file$9, 46, 20, 1562);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, t);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$4.name,
    		type: "each",
    		source: "(46:16) {#each json['changes'] as change}",
    		ctx
    	});

    	return block;
    }

    // (37:31)           <h1>Fetching data...</h1>      {:then json}
    function create_pending_block(ctx) {
    	let h1;

    	const block = {
    		c: function create() {
    			h1 = element("h1");
    			h1.textContent = "Fetching data...";
    			attr_dev(h1, "class", "svelte-1u4vbja");
    			add_location(h1, file$9, 37, 8, 1178);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h1, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_pending_block.name,
    		type: "pending",
    		source: "(37:31)           <h1>Fetching data...</h1>      {:then json}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$b(ctx) {
    	let div;

    	let info = {
    		ctx,
    		current: null,
    		token: null,
    		hasCatch: true,
    		pending: create_pending_block,
    		then: create_then_block,
    		catch: create_catch_block,
    		value: 2,
    		error: 11
    	};

    	handle_promise(/*GetLatestVersion*/ ctx[4](), info);

    	const block = {
    		c: function create() {
    			div = element("div");
    			info.block.c();
    			attr_dev(div, "id", "ChangeLogContainer");
    			attr_dev(div, "class", "svelte-1u4vbja");
    			toggle_class(div, "complete", /*visible*/ ctx[0]);
    			add_location(div, file$9, 35, 0, 1081);
    		},
    		l: function claim(nodes) {
    			throw new Error_1$1("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			info.block.m(div, info.anchor = null);
    			info.mount = () => div;
    			info.anchor = null;
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;
    			update_await_block_branch(info, ctx, dirty);

    			if (dirty & /*visible*/ 1) {
    				toggle_class(div, "complete", /*visible*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			info.block.d();
    			info.token = null;
    			info = null;
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$b.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$b($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ChangeLog', slots, []);
    	let { visible } = $$props;
    	let source = ` # Fetching ChangeLog...`;
    	let filename;
    	let githuburl;
    	let json = {};
    	let errormsg;

    	//import { onMount } from 'svelte';
    	//TODO: redo this module with the foodle api
    	//onMount(() => {
    	//setInterval(GetLatestVersion, 86400000) //Check the latest version once a day
    	//});
    	async function GetLatestVersion() {
    		const data = await fetch(`https://api.github.com/repos/JasonLovesDoggo/JasonLovesDoggo.github.io/releases/latest`, { mode: "cors" });
    		let json = await data.json();

    		if (data.ok) {
    			$$invalidate(1, githuburl = json['html_url']);
    			return await GetChangeLog(json['tag_name']);
    		}
    	}

    	async function GetChangeLog(tag_name) {
    		const data = await fetch(`https://nasoj.me/foodle/changelogs/${tag_name}.json`, { cache: 'no-cache' });

    		if (data.ok) {
    			return $$invalidate(2, json = await data.json());
    		} else {
    			throw new Error('Failed to fetch the changelog');
    		}
    	}

    	const writable_props = ['visible'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ChangeLog> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('visible' in $$props) $$invalidate(0, visible = $$props.visible);
    	};

    	$$self.$capture_state = () => ({
    		visible,
    		source,
    		filename,
    		githuburl,
    		json,
    		errormsg,
    		GetLatestVersion,
    		GetChangeLog
    	});

    	$$self.$inject_state = $$props => {
    		if ('visible' in $$props) $$invalidate(0, visible = $$props.visible);
    		if ('source' in $$props) source = $$props.source;
    		if ('filename' in $$props) filename = $$props.filename;
    		if ('githuburl' in $$props) $$invalidate(1, githuburl = $$props.githuburl);
    		if ('json' in $$props) $$invalidate(2, json = $$props.json);
    		if ('errormsg' in $$props) $$invalidate(3, errormsg = $$props.errormsg);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [visible, githuburl, json, errormsg, GetLatestVersion];
    }

    class ChangeLog extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$b, create_fragment$b, safe_not_equal, { visible: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ChangeLog",
    			options,
    			id: create_fragment$b.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*visible*/ ctx[0] === undefined && !('visible' in props)) {
    			console.warn("<ChangeLog> was created without expected prop 'visible'");
    		}
    	}

    	get visible() {
    		throw new Error_1$1("<ChangeLog>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set visible(value) {
    		throw new Error_1$1("<ChangeLog>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\widgets\Timer.svelte generated by Svelte v3.46.4 */
    const file$8 = "src\\components\\widgets\\Timer.svelte";

    // (32:4) {:else}
    function create_else_block$1(ctx) {
    	let div;
    	let svg;
    	let path;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			svg = svg_element("svg");
    			path = svg_element("path");
    			attr_dev(path, "d", "M4.609 12c0-4.082 3.309-7.391 7.391-7.391a7.39 7.39 0 0 1 6.523 3.912l-1.653 1.567H22v-5.13l-1.572 1.659C18.652 3.841 15.542 2 12 2 6.477 2 2 6.477 2 12s4.477 10 10 10c4.589 0 8.453-3.09 9.631-7.301l-2.512-.703c-.871 3.113-3.73 5.395-7.119 5.395-4.082 0-7.391-3.309-7.391-7.391z");
    			add_location(path, file$8, 34, 16, 1162);
    			attr_dev(svg, "xmlns", "http://www.w3.org/2000/svg");
    			attr_dev(svg, "viewBox", "0 0 24 24");
    			attr_dev(svg, "class", "svelte-48zflg");
    			add_location(svg, file$8, 33, 12, 1084);
    			attr_dev(div, "class", "button svelte-48zflg");
    			add_location(div, file$8, 32, 8, 1014);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, svg);
    			append_dev(svg, path);

    			if (!mounted) {
    				dispose = listen_dev(div, "click", /*click_handler*/ ctx[4], false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(32:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (26:4) {#if ms > 0}
    function create_if_block$5(ctx) {
    	let div;
    	let t0_value = `${Math.floor(/*ms*/ ctx[0] / ms.HOUR)}`.padStart(2, "0") + "";
    	let t0;
    	let t1;
    	let t2_value = `${Math.floor(/*ms*/ ctx[0] % ms.HOUR / ms.MINUTE)}`.padStart(2, "0") + "";
    	let t2;
    	let t3;
    	let t4_value = `${Math.floor(/*ms*/ ctx[0] % ms.MINUTE / ms.SECOND)}`.padStart(2, "0") + "";
    	let t4;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t0 = text(t0_value);
    			t1 = text(":");
    			t2 = text(t2_value);
    			t3 = text(":");
    			t4 = text(t4_value);
    			attr_dev(div, "class", "timer svelte-48zflg");
    			add_location(div, file$8, 26, 8, 756);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t0);
    			append_dev(div, t1);
    			append_dev(div, t2);
    			append_dev(div, t3);
    			append_dev(div, t4);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*ms*/ 1 && t0_value !== (t0_value = `${Math.floor(/*ms*/ ctx[0] / ms.HOUR)}`.padStart(2, "0") + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*ms*/ 1 && t2_value !== (t2_value = `${Math.floor(/*ms*/ ctx[0] % ms.HOUR / ms.MINUTE)}`.padStart(2, "0") + "")) set_data_dev(t2, t2_value);
    			if (dirty & /*ms*/ 1 && t4_value !== (t4_value = `${Math.floor(/*ms*/ ctx[0] % ms.MINUTE / ms.SECOND)}`.padStart(2, "0") + "")) set_data_dev(t4, t4_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$5.name,
    		type: "if",
    		source: "(26:4) {#if ms > 0}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$a(ctx) {
    	let h4;
    	let t1;
    	let div;

    	function select_block_type(ctx, dirty) {
    		if (/*ms*/ ctx[0] > 0) return create_if_block$5;
    		return create_else_block$1;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			h4 = element("h4");
    			h4.textContent = "Next Daily Foodle Is In";
    			t1 = space();
    			div = element("div");
    			if_block.c();
    			attr_dev(h4, "class", "svelte-48zflg");
    			add_location(h4, file$8, 23, 0, 671);
    			attr_dev(div, "class", "container svelte-48zflg");
    			add_location(div, file$8, 24, 0, 705);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h4, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div, anchor);
    			if_block.m(div, null);
    		},
    		p: function update(ctx, [dirty]) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(div, null);
    				}
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h4);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div);
    			if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$a.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$a($$self, $$props, $$invalidate) {
    	let $mode;
    	validate_store(mode, 'mode');
    	component_subscribe($$self, mode, $$value => $$invalidate(3, $mode = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Timer', slots, []);
    	const dispatch = createEventDispatcher();
    	let ms$1 = 1000;
    	let countDown;

    	function reset(m) {
    		clearInterval(countDown);
    		$$invalidate(0, ms$1 = timeRemaining(modeData.modes[m]));
    		if (ms$1 < 0) dispatch("timeup");

    		countDown = setInterval(
    			() => {
    				$$invalidate(0, ms$1 = timeRemaining(modeData.modes[m]));

    				if (ms$1 < 0) {
    					clearInterval(countDown);
    					dispatch("timeup");
    				}
    			},
    			ms.SECOND
    		);
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Timer> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => dispatch("reload");

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		MS: ms,
    		mode,
    		modeData,
    		timeRemaining,
    		dispatch,
    		ms: ms$1,
    		countDown,
    		reset,
    		$mode
    	});

    	$$self.$inject_state = $$props => {
    		if ('ms' in $$props) $$invalidate(0, ms$1 = $$props.ms);
    		if ('countDown' in $$props) countDown = $$props.countDown;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$mode*/ 8) {
    			reset($mode);
    		}
    	};

    	return [ms$1, dispatch, reset, $mode, click_handler];
    }

    class Timer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$a, create_fragment$a, safe_not_equal, { reset: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Timer",
    			options,
    			id: create_fragment$a.name
    		});
    	}

    	get reset() {
    		return this.$$.ctx[2];
    	}

    	set reset(value) {
    		throw new Error("<Timer>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\widgets\Toaster.svelte generated by Svelte v3.46.4 */
    const file$7 = "src\\components\\widgets\\Toaster.svelte";

    function get_each_context$3(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[2] = list[i];
    	return child_ctx;
    }

    // (10:1) {#each toast as slice}
    function create_each_block$3(ctx) {
    	let div;
    	let t_value = /*slice*/ ctx[2] + "";
    	let t;
    	let div_outro;
    	let current;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t = text(t_value);
    			attr_dev(div, "class", "slice svelte-1d9xss4");
    			add_location(div, file$7, 10, 2, 300);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if ((!current || dirty & /*toast*/ 1) && t_value !== (t_value = /*slice*/ ctx[2] + "")) set_data_dev(t, t_value);
    		},
    		i: function intro(local) {
    			if (current) return;
    			if (div_outro) div_outro.end(1);
    			current = true;
    		},
    		o: function outro(local) {
    			div_outro = create_out_transition(div, fade, { duration: 200 });
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (detaching && div_outro) div_outro.end();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$3.name,
    		type: "each",
    		source: "(10:1) {#each toast as slice}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$9(ctx) {
    	let div;
    	let current;
    	let each_value = /*toast*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(div, "class", "toast svelte-1d9xss4");
    			add_location(div, file$7, 8, 0, 252);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*toast*/ 1) {
    				each_value = /*toast*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$3(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$3(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Toaster', slots, []);

    	function pop(text, duration = 1) {
    		$$invalidate(0, toast = [text, ...toast]);
    		setTimeout(() => $$invalidate(0, toast = toast.slice(0, toast.length - 1)), duration * 1000);
    	}

    	let toast = [];
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Toaster> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ fade, pop, toast });

    	$$self.$inject_state = $$props => {
    		if ('toast' in $$props) $$invalidate(0, toast = $$props.toast);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [toast, pop];
    }

    class Toaster extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$9, create_fragment$9, safe_not_equal, { pop: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Toaster",
    			options,
    			id: create_fragment$9.name
    		});
    	}

    	get pop() {
    		return this.$$.ctx[1];
    	}

    	set pop(value) {
    		throw new Error("<Toaster>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\widgets\Tips.svelte generated by Svelte v3.46.4 */

    const file$6 = "src\\components\\widgets\\Tips.svelte";

    function create_fragment$8(ctx) {
    	let div2;
    	let div0;
    	let t0;
    	let t1_value = /*index*/ ctx[0] + 1 + "";
    	let t1;
    	let t2;
    	let t3_value = /*tips*/ ctx[1].length + "";
    	let t3;
    	let t4;
    	let div1;
    	let t5_value = /*tips*/ ctx[1][/*index*/ ctx[0]] + "";
    	let t5;
    	let t6;
    	let svg0;
    	let path0;
    	let t7;
    	let svg1;
    	let path1;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			div0 = element("div");
    			t0 = text("Tip ");
    			t1 = text(t1_value);
    			t2 = text("/");
    			t3 = text(t3_value);
    			t4 = space();
    			div1 = element("div");
    			t5 = text(t5_value);
    			t6 = space();
    			svg0 = svg_element("svg");
    			path0 = svg_element("path");
    			t7 = space();
    			svg1 = svg_element("svg");
    			path1 = svg_element("path");
    			attr_dev(div0, "class", "number svelte-ksmmv8");
    			add_location(div0, file$6, 19, 4, 1345);
    			attr_dev(div1, "class", "tip svelte-ksmmv8");
    			add_location(div1, file$6, 20, 4, 1406);
    			attr_dev(path0, "d", "M75,0L25,50L75,100z");
    			add_location(path0, file$6, 27, 8, 1658);
    			attr_dev(svg0, "class", "left svelte-ksmmv8");
    			attr_dev(svg0, "viewBox", "0 0 100 100");
    			attr_dev(svg0, "xmlns", "http://www.w3.org/2000/svg");
    			add_location(svg0, file$6, 21, 4, 1448);
    			attr_dev(path1, "d", "M25,0L75,50L25,100z");
    			add_location(path1, file$6, 35, 8, 1904);
    			attr_dev(svg1, "class", "right svelte-ksmmv8");
    			attr_dev(svg1, "viewBox", "0 0 100 100");
    			attr_dev(svg1, "xmlns", "http://www.w3.org/2000/svg");
    			add_location(svg1, file$6, 29, 4, 1707);
    			attr_dev(div2, "class", "outer svelte-ksmmv8");
    			add_location(div2, file$6, 18, 0, 1320);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, div0);
    			append_dev(div0, t0);
    			append_dev(div0, t1);
    			append_dev(div0, t2);
    			append_dev(div0, t3);
    			append_dev(div2, t4);
    			append_dev(div2, div1);
    			append_dev(div1, t5);
    			append_dev(div2, t6);
    			append_dev(div2, svg0);
    			append_dev(svg0, path0);
    			append_dev(div2, t7);
    			append_dev(div2, svg1);
    			append_dev(svg1, path1);

    			if (!mounted) {
    				dispose = [
    					listen_dev(svg0, "click", /*click_handler*/ ctx[3], false, false, false),
    					listen_dev(svg1, "click", /*click_handler_1*/ ctx[4], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*index*/ 1 && t1_value !== (t1_value = /*index*/ ctx[0] + 1 + "")) set_data_dev(t1, t1_value);
    			if (dirty & /*index*/ 1 && t5_value !== (t5_value = /*tips*/ ctx[1][/*index*/ ctx[0]] + "")) set_data_dev(t5, t5_value);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Tips', slots, []);
    	let { index = 0 } = $$props;

    	const tips = [
    		"You can change the gamemode by clicking Foodle.",
    		"Hard mode is game mode specific. Turning it on in one game mode won't change it on the others.",
    		"The Infinite word resets every time you reload the page",
    		"Double tap or right click a word on the board to learn its definition.",
    		"Hard mode can be enabled during a game if you haven't violated the hard mode rules yet.",
    		"Double tap or right click the next row to see how many possible words can be played there, if you use all the previous information.",
    		"Because words are chosen from the list randomly it is possible to get the same word again.",
    		"When you see the refresh button in the top left corner it means a new word is ready.",
    		"Make sure to read carefully the words are food *Related* that doesn't mean it's the name of a dish",
    		"Everyone has the same Daily/Hourly word at the same time. Your word #103 is the same as everyone else's #103.",
    		"There are more valid guesses than possible words, ie. not all 5 letter words can be selected as an answer by the game.",
    		"Historical games don't count towards your stats. Historical games are when you follow a link to a specific game number."
    	];

    	const length = tips.length;
    	const writable_props = ['index'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Tips> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => $$invalidate(0, index = (index - 1 + tips.length) % tips.length);
    	const click_handler_1 = () => $$invalidate(0, index = (index + 1) % tips.length);

    	$$self.$$set = $$props => {
    		if ('index' in $$props) $$invalidate(0, index = $$props.index);
    	};

    	$$self.$capture_state = () => ({ index, tips, length });

    	$$self.$inject_state = $$props => {
    		if ('index' in $$props) $$invalidate(0, index = $$props.index);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [index, tips, length, click_handler, click_handler_1];
    }

    class Tips extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$8, create_fragment$8, safe_not_equal, { index: 0, length: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Tips",
    			options,
    			id: create_fragment$8.name
    		});
    	}

    	get index() {
    		throw new Error("<Tips>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set index(value) {
    		throw new Error("<Tips>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get length() {
    		return this.$$.ctx[2];
    	}

    	set length(value) {
    		throw new Error("<Tips>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\widgets\Updater.svelte generated by Svelte v3.46.4 */

    function create_fragment$7(ctx) {
    	const block = {
    		c: noop,
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: noop,
    		p: noop,
    		i: noop,
    		o: noop,
    		d: noop
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Updater', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Updater> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Updater extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$7, create_fragment$7, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Updater",
    			options,
    			id: create_fragment$7.name
    		});
    	}
    }

    /* src\components\widgets\ShareGame.svelte generated by Svelte v3.46.4 */
    const file$5 = "src\\components\\widgets\\ShareGame.svelte";

    // (26:4) <GameIcon>
    function create_default_slot$1(ctx) {
    	let path;

    	const block = {
    		c: function create() {
    			path = svg_element("path");
    			attr_dev(path, "d", "M4.167 4.167c-1.381 1.381-1.381 3.619 0 5L6.5 11.5a1.18 1.18 0 0 1 0 1.667 1.18 1.18 0 0 1-1.667 0L2.5 10.833C.199 8.532.199 4.801 2.5 2.5s6.032-2.301 8.333 0l3.333 3.333c2.301 2.301 2.301 6.032 0 8.333a1.18 1.18 0 0 1-1.667 0 1.18 1.18 0 0 1 0-1.667c1.381-1.381 1.381-3.619 0-5L9.167 4.167c-1.381-1.381-3.619-1.381-5 0zm5.667 14c-2.301-2.301-2.301-6.032 0-8.333a1.18 1.18 0 0 1 1.667 0 1.18 1.18 0 0 1 0 1.667c-1.381 1.381-1.381 3.619 0 5l3.333 3.333c1.381 1.381 3.619 1.381 5 0s1.381-3.619 0-5L17.5 12.5a1.18 1.18 0 0 1 0-1.667 1.18 1.18 0 0 1 1.667 0l2.333 2.333c2.301 2.301 2.301 6.032 0 8.333s-6.032 2.301-8.333 0l-3.333-3.333z");
    			add_location(path, file$5, 26, 8, 926);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, path, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(path);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(26:4) <GameIcon>",
    		ctx
    	});

    	return block;
    }

    // (32:8) {#if !state.active}
    function create_if_block$4(ctx) {
    	let t0;
    	let div;
    	let a;
    	let t1;
    	let a_href_value;

    	const block = {
    		c: function create() {
    			t0 = text("|\r\n");
    			div = element("div");
    			a = element("a");
    			t1 = text("Tweet\r\n        Your Score");
    			attr_dev(a, "href", a_href_value = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(/*stats*/ ctx[3]) + "&url=https%3A%2F%2Fnasoj.me%2Ffoodle&related=JasonLovesDoggo");
    			add_location(a, file$5, 34, 4, 1736);
    			attr_dev(div, "class", "svelte-682uz5");
    			add_location(div, file$5, 33, 0, 1725);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, div, anchor);
    			append_dev(div, a);
    			append_dev(a, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*stats*/ 8 && a_href_value !== (a_href_value = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(/*stats*/ ctx[3]) + "&url=https%3A%2F%2Fnasoj.me%2Ffoodle&related=JasonLovesDoggo")) {
    				attr_dev(a, "href", a_href_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$4.name,
    		type: "if",
    		source: "(32:8) {#if !state.active}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let div1;
    	let div0;
    	let gameicon;
    	let t0;
    	let t1_value = modeData.modes[/*$mode*/ ctx[2]].name + "";
    	let t1;
    	let t2;
    	let t3;
    	let t4;
    	let t5;
    	let current;
    	let mounted;
    	let dispose;

    	gameicon = new GameIcon({
    			props: {
    				$$slots: { default: [create_default_slot$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	let if_block = !/*state*/ ctx[0].active && create_if_block$4(ctx);

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			create_component(gameicon.$$.fragment);
    			t0 = text("\r\n    Copy link to this game (");
    			t1 = text(t1_value);
    			t2 = text(" #");
    			t3 = text(/*wordNumber*/ ctx[1]);
    			t4 = text(")");
    			t5 = space();
    			if (if_block) if_block.c();
    			attr_dev(div0, "class", "svelte-682uz5");
    			add_location(div0, file$5, 24, 0, 878);
    			attr_dev(div1, "id", "share_container");
    			attr_dev(div1, "class", "svelte-682uz5");
    			add_location(div1, file$5, 23, 0, 850);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			mount_component(gameicon, div0, null);
    			append_dev(div0, t0);
    			append_dev(div0, t1);
    			append_dev(div0, t2);
    			append_dev(div0, t3);
    			append_dev(div0, t4);
    			append_dev(div1, t5);
    			if (if_block) if_block.m(div1, null);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(div0, "click", /*share*/ ctx[4], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			const gameicon_changes = {};

    			if (dirty & /*$$scope*/ 128) {
    				gameicon_changes.$$scope = { dirty, ctx };
    			}

    			gameicon.$set(gameicon_changes);
    			if ((!current || dirty & /*$mode*/ 4) && t1_value !== (t1_value = modeData.modes[/*$mode*/ ctx[2]].name + "")) set_data_dev(t1, t1_value);
    			if (!current || dirty & /*wordNumber*/ 2) set_data_dev(t3, /*wordNumber*/ ctx[1]);

    			if (!/*state*/ ctx[0].active) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$4(ctx);
    					if_block.c();
    					if_block.m(div1, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(gameicon.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(gameicon.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_component(gameicon);
    			if (if_block) if_block.d();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let $mode;
    	validate_store(mode, 'mode');
    	component_subscribe($$self, mode, $$value => $$invalidate(2, $mode = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('ShareGame', slots, []);
    	let stats;
    	let { state } = $$props;
    	let { wordNumber } = $$props;
    	const toaster = getContext("toaster");

    	function share() {
    		toaster.pop("Copied");
    		navigator.clipboard.writeText(`${window.location.href}/${wordNumber}`);
    	}

    	function failed() {
    		if (state.guesses === 0) {
    			return false;
    		}

    		return state.board.state[state.guesses - 1].join("") === ("🟩").repeat(COLS);
    	}

    	const writable_props = ['state', 'wordNumber'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<ShareGame> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('state' in $$props) $$invalidate(0, state = $$props.state);
    		if ('wordNumber' in $$props) $$invalidate(1, wordNumber = $$props.wordNumber);
    	};

    	$$self.$capture_state = () => ({
    		mode,
    		COLS,
    		modeData,
    		getContext,
    		GameIcon,
    		stats,
    		state,
    		wordNumber,
    		toaster,
    		share,
    		failed,
    		$mode
    	});

    	$$self.$inject_state = $$props => {
    		if ('stats' in $$props) $$invalidate(3, stats = $$props.stats);
    		if ('state' in $$props) $$invalidate(0, state = $$props.state);
    		if ('wordNumber' in $$props) $$invalidate(1, wordNumber = $$props.wordNumber);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$mode, state*/ 5) {
    			$$invalidate(3, stats = `${modeData.modes[$mode].name} Foodle #${state.wordNumber} ${!state.active && failed() ? state.guesses : "X"}/${state.board.words.length}\n\n    ${state.board.state.slice(0, state.guesses).map(r => r.join("")).join("\n    ")}\n\n`);
    		}
    	};

    	return [state, wordNumber, $mode, stats, share];
    }

    class ShareGame extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$6, create_fragment$6, safe_not_equal, { state: 0, wordNumber: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "ShareGame",
    			options,
    			id: create_fragment$6.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*state*/ ctx[0] === undefined && !('state' in props)) {
    			console.warn("<ShareGame> was created without expected prop 'state'");
    		}

    		if (/*wordNumber*/ ctx[1] === undefined && !('wordNumber' in props)) {
    			console.warn("<ShareGame> was created without expected prop 'wordNumber'");
    		}
    	}

    	get state() {
    		throw new Error("<ShareGame>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set state(value) {
    		throw new Error("<ShareGame>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get wordNumber() {
    		throw new Error("<ShareGame>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set wordNumber(value) {
    		throw new Error("<ShareGame>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\widgets\stats\Stat.svelte generated by Svelte v3.46.4 */

    const file$4 = "src\\components\\widgets\\stats\\Stat.svelte";

    function create_fragment$5(ctx) {
    	let section;
    	let div0;
    	let t0;
    	let t1;
    	let div1;
    	let t2;

    	const block = {
    		c: function create() {
    			section = element("section");
    			div0 = element("div");
    			t0 = text(/*stat*/ ctx[0]);
    			t1 = space();
    			div1 = element("div");
    			t2 = text(/*name*/ ctx[1]);
    			attr_dev(div0, "class", "stat svelte-16mv1yu");
    			add_location(div0, file$4, 5, 1, 79);
    			attr_dev(div1, "class", "name svelte-16mv1yu");
    			add_location(div1, file$4, 6, 1, 112);
    			attr_dev(section, "class", "svelte-16mv1yu");
    			add_location(section, file$4, 4, 0, 67);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, section, anchor);
    			append_dev(section, div0);
    			append_dev(div0, t0);
    			append_dev(section, t1);
    			append_dev(section, div1);
    			append_dev(div1, t2);
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*stat*/ 1) set_data_dev(t0, /*stat*/ ctx[0]);
    			if (dirty & /*name*/ 2) set_data_dev(t2, /*name*/ ctx[1]);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(section);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Stat', slots, []);
    	let { stat } = $$props;
    	let { name } = $$props;
    	const writable_props = ['stat', 'name'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Stat> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('stat' in $$props) $$invalidate(0, stat = $$props.stat);
    		if ('name' in $$props) $$invalidate(1, name = $$props.name);
    	};

    	$$self.$capture_state = () => ({ stat, name });

    	$$self.$inject_state = $$props => {
    		if ('stat' in $$props) $$invalidate(0, stat = $$props.stat);
    		if ('name' in $$props) $$invalidate(1, name = $$props.name);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [stat, name];
    }

    class Stat extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$5, create_fragment$5, safe_not_equal, { stat: 0, name: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Stat",
    			options,
    			id: create_fragment$5.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*stat*/ ctx[0] === undefined && !('stat' in props)) {
    			console.warn("<Stat> was created without expected prop 'stat'");
    		}

    		if (/*name*/ ctx[1] === undefined && !('name' in props)) {
    			console.warn("<Stat> was created without expected prop 'name'");
    		}
    	}

    	get stat() {
    		throw new Error("<Stat>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set stat(value) {
    		throw new Error("<Stat>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get name() {
    		throw new Error("<Stat>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<Stat>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\widgets\stats\Statistics.svelte generated by Svelte v3.46.4 */

    const { Object: Object_1$2 } = globals;
    const file$3 = "src\\components\\widgets\\stats\\Statistics.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[3] = list[i];
    	return child_ctx;
    }

    // (32:1) {#each stats as stat}
    function create_each_block$2(ctx) {
    	let stat;
    	let current;

    	stat = new Stat({
    			props: {
    				name: /*stat*/ ctx[3][0],
    				stat: /*stat*/ ctx[3][1]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(stat.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(stat, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const stat_changes = {};
    			if (dirty & /*stats*/ 1) stat_changes.name = /*stat*/ ctx[3][0];
    			if (dirty & /*stats*/ 1) stat_changes.stat = /*stat*/ ctx[3][1];
    			stat.$set(stat_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(stat.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(stat.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(stat, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(32:1) {#each stats as stat}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let h3;
    	let t0;
    	let t1_value = modeData.modes[/*$mode*/ ctx[1]].name + "";
    	let t1;
    	let t2;
    	let t3;
    	let div;
    	let current;
    	let each_value = /*stats*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			h3 = element("h3");
    			t0 = text("Statistics (");
    			t1 = text(t1_value);
    			t2 = text(")");
    			t3 = space();
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(h3, file$3, 29, 0, 891);
    			attr_dev(div, "class", "svelte-126h01n");
    			add_location(div, file$3, 30, 0, 943);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h3, anchor);
    			append_dev(h3, t0);
    			append_dev(h3, t1);
    			append_dev(h3, t2);
    			insert_dev(target, t3, anchor);
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if ((!current || dirty & /*$mode*/ 2) && t1_value !== (t1_value = modeData.modes[/*$mode*/ ctx[1]].name + "")) set_data_dev(t1, t1_value);

    			if (dirty & /*stats*/ 1) {
    				each_value = /*stats*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h3);
    			if (detaching) detach_dev(t3);
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let $mode;
    	validate_store(mode, 'mode');
    	component_subscribe($$self, mode, $$value => $$invalidate(1, $mode = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Statistics', slots, []);
    	let { data } = $$props;
    	let stats;
    	const writable_props = ['data'];

    	Object_1$2.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Statistics> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('data' in $$props) $$invalidate(2, data = $$props.data);
    	};

    	$$self.$capture_state = () => ({ mode, modeData, Stat, data, stats, $mode });

    	$$self.$inject_state = $$props => {
    		if ('data' in $$props) $$invalidate(2, data = $$props.data);
    		if ('stats' in $$props) $$invalidate(0, stats = $$props.stats);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*data, stats*/ 5) {
    			{
    				$$invalidate(0, stats = [
    					["Played", data.played],
    					[
    						"Win %",
    						Math.round((data.played - data.guesses.fail) / data.played * 100) || 0
    					],
    					[
    						"Average Guesses",
    						(Object.entries(data.guesses).reduce(
    							(a, b) => {
    								if (!isNaN(parseInt(b[0]))) {
    									return a + parseInt(b[0]) * b[1];
    								}

    								return a;
    							},
    							0
    						) / data.played || 0).toFixed(1)
    					]
    				]);

    				if (data.guesses.fail > 0) {
    					stats.push(["Lost", data.guesses.fail]);
    				}

    				if ("streak" in data) {
    					stats.push(["Current Streak", data.streak]);
    					stats.push(["Max Streak", data.maxStreak]);
    				}
    			}
    		}
    	};

    	return [stats, $mode, data];
    }

    class Statistics extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$4, create_fragment$4, safe_not_equal, { data: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Statistics",
    			options,
    			id: create_fragment$4.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*data*/ ctx[2] === undefined && !('data' in props)) {
    			console.warn("<Statistics> was created without expected prop 'data'");
    		}
    	}

    	get data() {
    		throw new Error("<Statistics>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set data(value) {
    		throw new Error("<Statistics>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\widgets\stats\Distribution.svelte generated by Svelte v3.46.4 */

    const { Object: Object_1$1 } = globals;
    const file$2 = "src\\components\\widgets\\stats\\Distribution.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[3] = list[i];
    	child_ctx[6] = i;
    	const constants_0 = Number(/*guess*/ child_ctx[3][0]);
    	child_ctx[4] = constants_0;
    	return child_ctx;
    }

    // (15:2) {#if !isNaN(g)}
    function create_if_block$3(ctx) {
    	let div1;
    	let span;
    	let t0_value = /*guess*/ ctx[3][0] + "";
    	let t0;
    	let t1;
    	let div0;
    	let t2_value = /*guess*/ ctx[3][1] + "";
    	let t2;
    	let t3;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			span = element("span");
    			t0 = text(t0_value);
    			t1 = space();
    			div0 = element("div");
    			t2 = text(t2_value);
    			t3 = space();
    			attr_dev(span, "class", "guess svelte-8n4mf8");
    			add_location(span, file$2, 16, 16, 484);
    			attr_dev(div0, "class", "bar svelte-8n4mf8");
    			set_style(div0, "width", /*guess*/ ctx[3][1] / /*max*/ ctx[2] * 100 + "%");
    			toggle_class(div0, "this", /*g*/ ctx[4] === /*game*/ ctx[0].guesses && !/*game*/ ctx[0].active && !failed(/*game*/ ctx[0]));
    			add_location(div0, file$2, 17, 16, 539);
    			attr_dev(div1, "class", "graph svelte-8n4mf8");
    			add_location(div1, file$2, 15, 12, 447);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, span);
    			append_dev(span, t0);
    			append_dev(div1, t1);
    			append_dev(div1, div0);
    			append_dev(div0, t2);
    			append_dev(div1, t3);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*distribution*/ 2 && t0_value !== (t0_value = /*guess*/ ctx[3][0] + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*distribution*/ 2 && t2_value !== (t2_value = /*guess*/ ctx[3][1] + "")) set_data_dev(t2, t2_value);

    			if (dirty & /*distribution, max*/ 6) {
    				set_style(div0, "width", /*guess*/ ctx[3][1] / /*max*/ ctx[2] * 100 + "%");
    			}

    			if (dirty & /*Number, Object, distribution, game, failed*/ 3) {
    				toggle_class(div0, "this", /*g*/ ctx[4] === /*game*/ ctx[0].guesses && !/*game*/ ctx[0].active && !failed(/*game*/ ctx[0]));
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(15:2) {#if !isNaN(g)}",
    		ctx
    	});

    	return block;
    }

    // (13:4) {#each Object.entries(distribution) as guess, i (guess[0])}
    function create_each_block$1(key_1, ctx) {
    	let first;
    	let show_if = !isNaN(/*g*/ ctx[4]);
    	let if_block_anchor;
    	let if_block = show_if && create_if_block$3(ctx);

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			first = empty();
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    			this.first = first;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, first, anchor);
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			if (dirty & /*distribution*/ 2) show_if = !isNaN(/*g*/ ctx[4]);

    			if (show_if) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$3(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(first);
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(13:4) {#each Object.entries(distribution) as guess, i (guess[0])}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let h3;
    	let t1;
    	let div;
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let each_value = Object.entries(/*distribution*/ ctx[1]);
    	validate_each_argument(each_value);
    	const get_key = ctx => /*guess*/ ctx[3][0];
    	validate_each_keys(ctx, each_value, get_each_context$1, get_key);

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context$1(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block$1(key, child_ctx));
    	}

    	const block = {
    		c: function create() {
    			h3 = element("h3");
    			h3.textContent = "guess distribution";
    			t1 = space();
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			add_location(h3, file$2, 10, 0, 264);
    			attr_dev(div, "class", "container svelte-8n4mf8");
    			add_location(div, file$2, 11, 0, 293);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h3, anchor);
    			insert_dev(target, t1, anchor);
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*Object, distribution, max, Number, game, failed, isNaN*/ 7) {
    				each_value = Object.entries(/*distribution*/ ctx[1]);
    				validate_each_argument(each_value);
    				validate_each_keys(ctx, each_value, get_each_context$1, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, div, destroy_block, create_each_block$1, null, get_each_context$1);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h3);
    			if (detaching) detach_dev(t1);
    			if (detaching) detach_dev(div);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d();
    			}
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let max;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Distribution', slots, []);
    	let { game } = $$props;
    	let { distribution } = $$props;
    	const writable_props = ['game', 'distribution'];

    	Object_1$1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Distribution> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('game' in $$props) $$invalidate(0, game = $$props.game);
    		if ('distribution' in $$props) $$invalidate(1, distribution = $$props.distribution);
    	};

    	$$self.$capture_state = () => ({ failed, game, distribution, max });

    	$$self.$inject_state = $$props => {
    		if ('game' in $$props) $$invalidate(0, game = $$props.game);
    		if ('distribution' in $$props) $$invalidate(1, distribution = $$props.distribution);
    		if ('max' in $$props) $$invalidate(2, max = $$props.max);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*distribution*/ 2) {
    			$$invalidate(2, max = Object.entries(distribution).reduce(
    				(p, c) => {
    					if (!isNaN(Number(c[0]))) return Math.max(c[1], p);
    					return p;
    				},
    				1
    			));
    		}
    	};

    	return [game, distribution, max];
    }

    class Distribution extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance$3, create_fragment$3, safe_not_equal, { game: 0, distribution: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Distribution",
    			options,
    			id: create_fragment$3.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*game*/ ctx[0] === undefined && !('game' in props)) {
    			console.warn("<Distribution> was created without expected prop 'game'");
    		}

    		if (/*distribution*/ ctx[1] === undefined && !('distribution' in props)) {
    			console.warn("<Distribution> was created without expected prop 'distribution'");
    		}
    	}

    	get game() {
    		throw new Error("<Distribution>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set game(value) {
    		throw new Error("<Distribution>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get distribution() {
    		throw new Error("<Distribution>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set distribution(value) {
    		throw new Error("<Distribution>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /*! js-cookie v3.0.1 | MIT */
    /* eslint-disable no-var */
    function assign (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          target[key] = source[key];
        }
      }
      return target
    }
    /* eslint-enable no-var */

    /* eslint-disable no-var */
    var defaultConverter = {
      read: function (value) {
        if (value[0] === '"') {
          value = value.slice(1, -1);
        }
        return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
      },
      write: function (value) {
        return encodeURIComponent(value).replace(
          /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
          decodeURIComponent
        )
      }
    };
    /* eslint-enable no-var */

    /* eslint-disable no-var */

    function init (converter, defaultAttributes) {
      function set (key, value, attributes) {
        if (typeof document === 'undefined') {
          return
        }

        attributes = assign({}, defaultAttributes, attributes);

        if (typeof attributes.expires === 'number') {
          attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
        }
        if (attributes.expires) {
          attributes.expires = attributes.expires.toUTCString();
        }

        key = encodeURIComponent(key)
          .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
          .replace(/[()]/g, escape);

        var stringifiedAttributes = '';
        for (var attributeName in attributes) {
          if (!attributes[attributeName]) {
            continue
          }

          stringifiedAttributes += '; ' + attributeName;

          if (attributes[attributeName] === true) {
            continue
          }

          // Considers RFC 6265 section 5.2:
          // ...
          // 3.  If the remaining unparsed-attributes contains a %x3B (";")
          //     character:
          // Consume the characters of the unparsed-attributes up to,
          // not including, the first %x3B (";") character.
          // ...
          stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
        }

        return (document.cookie =
          key + '=' + converter.write(value, key) + stringifiedAttributes)
      }

      function get (key) {
        if (typeof document === 'undefined' || (arguments.length && !key)) {
          return
        }

        // To prevent the for loop in the first place assign an empty array
        // in case there are no cookies at all.
        var cookies = document.cookie ? document.cookie.split('; ') : [];
        var jar = {};
        for (var i = 0; i < cookies.length; i++) {
          var parts = cookies[i].split('=');
          var value = parts.slice(1).join('=');

          try {
            var foundKey = decodeURIComponent(parts[0]);
            jar[foundKey] = converter.read(value, foundKey);

            if (key === foundKey) {
              break
            }
          } catch (e) {}
        }

        return key ? jar[key] : jar
      }

      return Object.create(
        {
          set: set,
          get: get,
          remove: function (key, attributes) {
            set(
              key,
              '',
              assign({}, attributes, {
                expires: -1
              })
            );
          },
          withAttributes: function (attributes) {
            return init(this.converter, assign({}, this.attributes, attributes))
          },
          withConverter: function (converter) {
            return init(assign({}, this.converter, converter), this.attributes)
          }
        },
        {
          attributes: { value: Object.freeze(defaultAttributes) },
          converter: { value: Object.freeze(converter) }
        }
      )
    }

    var api = init(defaultConverter, { path: '/' });

    /* src\components\widgets\gdprCookies.svelte generated by Svelte v3.46.4 */

    const { Error: Error_1, Object: Object_1, console: console_1 } = globals;
    const file$1 = "src\\components\\widgets\\gdprCookies.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[26] = list[i];
    	child_ctx[27] = list;
    	child_ctx[28] = i;
    	return child_ctx;
    }

    // (141:0) {#if shown}
    function create_if_block_2$1(ctx) {
    	let div4;
    	let div3;
    	let div1;
    	let div0;
    	let h4;
    	let t0;
    	let t1;
    	let br;
    	let t2;
    	let p0;
    	let t3;
    	let a;
    	let t5;
    	let p1;
    	let t6;
    	let div2;
    	let button0;
    	let t7;
    	let t8;
    	let button1;
    	let t9;
    	let div4_transition;
    	let current;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div4 = element("div");
    			div3 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			h4 = element("h4");
    			t0 = text(/*heading*/ ctx[0]);
    			t1 = space();
    			br = element("br");
    			t2 = space();
    			p0 = element("p");
    			t3 = space();
    			a = element("a");
    			a.textContent = "Privacy Policy";
    			t5 = space();
    			p1 = element("p");
    			t6 = space();
    			div2 = element("div");
    			button0 = element("button");
    			t7 = text(/*settingsLabel*/ ctx[4]);
    			t8 = space();
    			button1 = element("button");
    			t9 = text(/*acceptLabel*/ ctx[3]);
    			attr_dev(h4, "class", "cookieConsent__Title");
    			add_location(h4, file$1, 145, 10, 3678);
    			add_location(br, file$1, 146, 10, 3736);
    			attr_dev(p0, "class", "cookieConsent__Description");
    			add_location(p0, file$1, 147, 10, 3751);
    			attr_dev(a, "href", "./privacy.html");
    			add_location(a, file$1, 150, 10, 3849);
    			attr_dev(p1, "class", "cookieConsent__Description");
    			add_location(p1, file$1, 151, 10, 3903);
    			attr_dev(div0, "class", "cookieConsent__Content");
    			add_location(div0, file$1, 144, 8, 3631);
    			attr_dev(div1, "class", "cookieConsent__Left");
    			add_location(div1, file$1, 143, 6, 3589);
    			attr_dev(button0, "type", "button");
    			attr_dev(button0, "class", "cookieConsent__Button");
    			add_location(button0, file$1, 157, 8, 4068);
    			attr_dev(button1, "type", "submit");
    			attr_dev(button1, "class", "cookieConsent__Button");
    			add_location(button1, file$1, 163, 8, 4264);
    			attr_dev(div2, "class", "cookieConsent__Right");
    			add_location(div2, file$1, 156, 6, 4025);
    			attr_dev(div3, "class", "cookieConsent");
    			add_location(div3, file$1, 142, 4, 3555);
    			attr_dev(div4, "class", "cookieConsentWrapper");
    			add_location(div4, file$1, 141, 2, 3500);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div4, anchor);
    			append_dev(div4, div3);
    			append_dev(div3, div1);
    			append_dev(div1, div0);
    			append_dev(div0, h4);
    			append_dev(h4, t0);
    			append_dev(div0, t1);
    			append_dev(div0, br);
    			append_dev(div0, t2);
    			append_dev(div0, p0);
    			p0.innerHTML = /*description_1*/ ctx[1];
    			append_dev(div0, t3);
    			append_dev(div0, a);
    			append_dev(div0, t5);
    			append_dev(div0, p1);
    			p1.innerHTML = /*description_2*/ ctx[2];
    			append_dev(div3, t6);
    			append_dev(div3, div2);
    			append_dev(div2, button0);
    			append_dev(button0, t7);
    			append_dev(div2, t8);
    			append_dev(div2, button1);
    			append_dev(button1, t9);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*click_handler*/ ctx[16], false, false, false),
    					listen_dev(button1, "click", /*choose*/ ctx[10], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (!current || dirty & /*heading*/ 1) set_data_dev(t0, /*heading*/ ctx[0]);
    			if (!current || dirty & /*description_1*/ 2) p0.innerHTML = /*description_1*/ ctx[1];			if (!current || dirty & /*description_2*/ 4) p1.innerHTML = /*description_2*/ ctx[2];			if (!current || dirty & /*settingsLabel*/ 16) set_data_dev(t7, /*settingsLabel*/ ctx[4]);
    			if (!current || dirty & /*acceptLabel*/ 8) set_data_dev(t9, /*acceptLabel*/ ctx[3]);
    		},
    		i: function intro(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (!div4_transition) div4_transition = create_bidirectional_transition(div4, fade, {}, true);
    				div4_transition.run(1);
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			if (!div4_transition) div4_transition = create_bidirectional_transition(div4, fade, {}, false);
    			div4_transition.run(0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div4);
    			if (detaching && div4_transition) div4_transition.end();
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$1.name,
    		type: "if",
    		source: "(141:0) {#if shown}",
    		ctx
    	});

    	return block;
    }

    // (172:0) {#if settingsShown}
    function create_if_block$2(ctx) {
    	let div1;
    	let div0;
    	let t0;
    	let button;
    	let t1;
    	let div1_transition;
    	let current;
    	let mounted;
    	let dispose;
    	let each_value = /*choicesArr*/ ctx[7];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t0 = space();
    			button = element("button");
    			t1 = text(/*closeLabel*/ ctx[5]);
    			attr_dev(button, "type", "submit");
    			attr_dev(button, "class", "cookieConsent__Button cookieConsent__Button--Close");
    			add_location(button, file$1, 191, 6, 5285);
    			attr_dev(div0, "class", "cookieConsentOperations__List");
    			add_location(div0, file$1, 173, 4, 4497);
    			attr_dev(div1, "class", "cookieConsentOperations");
    			add_location(div1, file$1, 172, 2, 4439);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div0, null);
    			}

    			append_dev(div0, t0);
    			append_dev(div0, button);
    			append_dev(button, t1);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*click_handler_1*/ ctx[18], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*choicesArr, choicesMerged, Object*/ 192) {
    				each_value = /*choicesArr*/ ctx[7];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div0, t0);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			if (!current || dirty & /*closeLabel*/ 32) set_data_dev(t1, /*closeLabel*/ ctx[5]);
    		},
    		i: function intro(local) {
    			if (current) return;

    			add_render_callback(() => {
    				if (!div1_transition) div1_transition = create_bidirectional_transition(div1, fade, {}, true);
    				div1_transition.run(1);
    			});

    			current = true;
    		},
    		o: function outro(local) {
    			if (!div1_transition) div1_transition = create_bidirectional_transition(div1, fade, {}, false);
    			div1_transition.run(0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_each(each_blocks, detaching);
    			if (detaching && div1_transition) div1_transition.end();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(172:0) {#if settingsShown}",
    		ctx
    	});

    	return block;
    }

    // (176:8) {#if Object.hasOwnProperty.call(choicesMerged, choice.id) && choicesMerged[choice.id]}
    function create_if_block_1$1(ctx) {
    	let div;
    	let input;
    	let input_id_value;
    	let t0;
    	let label;
    	let t1_value = /*choice*/ ctx[26].label + "";
    	let t1;
    	let label_for_value;
    	let t2;
    	let span;
    	let t3_value = /*choice*/ ctx[26].description + "";
    	let t3;
    	let mounted;
    	let dispose;

    	function input_change_handler() {
    		/*input_change_handler*/ ctx[17].call(input, /*choice*/ ctx[26]);
    	}

    	const block = {
    		c: function create() {
    			div = element("div");
    			input = element("input");
    			t0 = space();
    			label = element("label");
    			t1 = text(t1_value);
    			t2 = space();
    			span = element("span");
    			t3 = text(t3_value);
    			attr_dev(input, "type", "checkbox");
    			attr_dev(input, "id", input_id_value = `gdpr-check-${/*choice*/ ctx[26].id}`);
    			input.disabled = true;
    			add_location(input, file$1, 179, 12, 4795);
    			attr_dev(label, "for", label_for_value = `gdpr-check-${/*choice*/ ctx[26].id}`);
    			add_location(label, file$1, 184, 12, 5059);
    			attr_dev(span, "class", "cookieConsentOperations__ItemLabel");
    			add_location(span, file$1, 185, 12, 5133);
    			attr_dev(div, "class", "cookieConsentOperations__Item");
    			toggle_class(div, "disabled", true);
    			add_location(div, file$1, 176, 10, 4681);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, input);
    			input.checked = /*choicesMerged*/ ctx[6][/*choice*/ ctx[26].id].value;
    			append_dev(div, t0);
    			append_dev(div, label);
    			append_dev(label, t1);
    			append_dev(div, t2);
    			append_dev(div, span);
    			append_dev(span, t3);

    			if (!mounted) {
    				dispose = listen_dev(input, "change", input_change_handler);
    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty & /*choicesArr*/ 128 && input_id_value !== (input_id_value = `gdpr-check-${/*choice*/ ctx[26].id}`)) {
    				attr_dev(input, "id", input_id_value);
    			}

    			if (dirty & /*choicesMerged, choicesArr*/ 192) {
    				input.checked = /*choicesMerged*/ ctx[6][/*choice*/ ctx[26].id].value;
    			}

    			if (dirty & /*choicesArr*/ 128 && t1_value !== (t1_value = /*choice*/ ctx[26].label + "")) set_data_dev(t1, t1_value);

    			if (dirty & /*choicesArr*/ 128 && label_for_value !== (label_for_value = `gdpr-check-${/*choice*/ ctx[26].id}`)) {
    				attr_dev(label, "for", label_for_value);
    			}

    			if (dirty & /*choicesArr*/ 128 && t3_value !== (t3_value = /*choice*/ ctx[26].description + "")) set_data_dev(t3, t3_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(176:8) {#if Object.hasOwnProperty.call(choicesMerged, choice.id) && choicesMerged[choice.id]}",
    		ctx
    	});

    	return block;
    }

    // (175:6) {#each choicesArr as choice}
    function create_each_block(ctx) {
    	let show_if = Object.hasOwnProperty.call(/*choicesMerged*/ ctx[6], /*choice*/ ctx[26].id) && /*choicesMerged*/ ctx[6][/*choice*/ ctx[26].id];
    	let if_block_anchor;
    	let if_block = show_if && create_if_block_1$1(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*choicesMerged, choicesArr*/ 192) show_if = Object.hasOwnProperty.call(/*choicesMerged*/ ctx[6], /*choice*/ ctx[26].id) && /*choicesMerged*/ ctx[6][/*choice*/ ctx[26].id];

    			if (show_if) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_1$1(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(175:6) {#each choicesArr as choice}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let t;
    	let if_block1_anchor;
    	let current;
    	let if_block0 = /*shown*/ ctx[8] && create_if_block_2$1(ctx);
    	let if_block1 = /*settingsShown*/ ctx[9] && create_if_block$2(ctx);

    	const block = {
    		c: function create() {
    			if (if_block0) if_block0.c();
    			t = space();
    			if (if_block1) if_block1.c();
    			if_block1_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error_1("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block0) if_block0.m(target, anchor);
    			insert_dev(target, t, anchor);
    			if (if_block1) if_block1.m(target, anchor);
    			insert_dev(target, if_block1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*shown*/ ctx[8]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);

    					if (dirty & /*shown*/ 256) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_2$1(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(t.parentNode, t);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if (/*settingsShown*/ ctx[9]) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty & /*settingsShown*/ 512) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block$2(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			transition_in(if_block1);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			transition_out(if_block1);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block0) if_block0.d(detaching);
    			if (detaching) detach_dev(t);
    			if (if_block1) if_block1.d(detaching);
    			if (detaching) detach_dev(if_block1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let choicesMerged;
    	let choicesArr;
    	let cookieChoices;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('GdprCookies', slots, []);
    	const dispatch = createEventDispatcher();
    	let { cookieName = 'gdpr_settings' } = $$props;
    	let shown = false;
    	let settingsShown = false;
    	let { heading = 'GDPR Cookie Policy' } = $$props;
    	let { description_1 = 'We use cookies to offer a better browsing experience, analyze site traffic and provide statistics for Foodle. By Continuing, you consent to our ' } = $$props;
    	let { description_2 = '& use of cookies.' } = $$props;

    	let { categories = {
    		analytics() {
    			console.log('analytics accepted');
    		},
    		statistics() {
    			console.log('statistics accepted');
    		},
    		necessary() {
    			console.log('necessary accepted');
    		}
    	} } = $$props;

    	let { cookieConfig = {} } = $$props;
    	const defaults = { sameSite: 'strict' };
    	let { choices = {} } = $$props;

    	const choicesDefaults = {
    		necessary: {
    			label: 'Necessary cookies',
    			description: 'Used for cookie control.',
    			value: true
    		},
    		statistics: {
    			label: 'statistics cookies',
    			description: 'Used for Statistics purposes. Such as keeping your foodle score',
    			value: true
    		},
    		analytics: {
    			label: 'Analytics cookies',
    			description: 'Used to control Google Analytics, a 3rd party tool offered by Google to analyse user behavior.',
    			value: true
    		}
    	};

    	let { acceptLabel = 'Continue' } = $$props;
    	let { settingsLabel = 'Types of Cookies Used' } = $$props;
    	let { closeLabel = 'Close' } = $$props;

    	function show() {
    		$$invalidate(8, shown = true);
    	}

    	onMount(() => {
    		if (!cookieName) {
    			throw new Error('You must set gdpr cookie name');
    		}

    		const cookie = api.get(cookieName);

    		if (!cookie) {
    			show();
    		}

    		try {
    			const { choices } = JSON.parse(cookie);
    			const valid = validate(cookieChoices, choices);

    			if (!valid) {
    				throw new Error('cookie consent has changed');
    			}

    			execute(choices);
    		} catch(e) {
    			removeCookie();
    			show();
    		}
    	});

    	function setCookie(choices) {
    		const expires = new Date();
    		expires.setDate(expires.getDate() + 365);
    		const options = Object.assign({}, defaults, cookieConfig, { expires });
    		api.set(cookieName, JSON.stringify({ choices }), options);
    	}

    	function removeCookie() {
    		const { path } = cookieConfig;
    		api.remove(cookieName, Object.assign({}, path ? { path } : {}));
    	}

    	function execute(chosen) {
    		const types = Object.keys(cookieChoices);

    		types.forEach(t => {
    			const agreed = chosen[t];

    			if (choicesMerged[t]) {
    				$$invalidate(6, choicesMerged[t].value = agreed, choicesMerged);
    			}

    			if (agreed) {
    				categories[t] && categories[t]();
    				dispatch(`${t}`);
    			}
    		});

    		$$invalidate(8, shown = false);
    	}

    	function choose() {
    		setCookie(cookieChoices);
    		execute(cookieChoices);
    	}

    	const writable_props = [
    		'cookieName',
    		'heading',
    		'description_1',
    		'description_2',
    		'categories',
    		'cookieConfig',
    		'choices',
    		'acceptLabel',
    		'settingsLabel',
    		'closeLabel'
    	];

    	Object_1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<GdprCookies> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => {
    		$$invalidate(9, settingsShown = true);
    	};

    	function input_change_handler(choice) {
    		choicesMerged[choice.id].value = this.checked;
    		($$invalidate(6, choicesMerged), $$invalidate(14, choices));
    	}

    	const click_handler_1 = () => {
    		$$invalidate(9, settingsShown = false);
    	};

    	$$self.$$set = $$props => {
    		if ('cookieName' in $$props) $$invalidate(11, cookieName = $$props.cookieName);
    		if ('heading' in $$props) $$invalidate(0, heading = $$props.heading);
    		if ('description_1' in $$props) $$invalidate(1, description_1 = $$props.description_1);
    		if ('description_2' in $$props) $$invalidate(2, description_2 = $$props.description_2);
    		if ('categories' in $$props) $$invalidate(12, categories = $$props.categories);
    		if ('cookieConfig' in $$props) $$invalidate(13, cookieConfig = $$props.cookieConfig);
    		if ('choices' in $$props) $$invalidate(14, choices = $$props.choices);
    		if ('acceptLabel' in $$props) $$invalidate(3, acceptLabel = $$props.acceptLabel);
    		if ('settingsLabel' in $$props) $$invalidate(4, settingsLabel = $$props.settingsLabel);
    		if ('closeLabel' in $$props) $$invalidate(5, closeLabel = $$props.closeLabel);
    	};

    	$$self.$capture_state = () => ({
    		Cookies: api,
    		fade,
    		onMount,
    		createEventDispatcher,
    		validate,
    		dispatch,
    		cookieName,
    		shown,
    		settingsShown,
    		heading,
    		description_1,
    		description_2,
    		categories,
    		cookieConfig,
    		defaults,
    		choices,
    		choicesDefaults,
    		acceptLabel,
    		settingsLabel,
    		closeLabel,
    		show,
    		setCookie,
    		removeCookie,
    		execute,
    		choose,
    		cookieChoices,
    		choicesMerged,
    		choicesArr
    	});

    	$$self.$inject_state = $$props => {
    		if ('cookieName' in $$props) $$invalidate(11, cookieName = $$props.cookieName);
    		if ('shown' in $$props) $$invalidate(8, shown = $$props.shown);
    		if ('settingsShown' in $$props) $$invalidate(9, settingsShown = $$props.settingsShown);
    		if ('heading' in $$props) $$invalidate(0, heading = $$props.heading);
    		if ('description_1' in $$props) $$invalidate(1, description_1 = $$props.description_1);
    		if ('description_2' in $$props) $$invalidate(2, description_2 = $$props.description_2);
    		if ('categories' in $$props) $$invalidate(12, categories = $$props.categories);
    		if ('cookieConfig' in $$props) $$invalidate(13, cookieConfig = $$props.cookieConfig);
    		if ('choices' in $$props) $$invalidate(14, choices = $$props.choices);
    		if ('acceptLabel' in $$props) $$invalidate(3, acceptLabel = $$props.acceptLabel);
    		if ('settingsLabel' in $$props) $$invalidate(4, settingsLabel = $$props.settingsLabel);
    		if ('closeLabel' in $$props) $$invalidate(5, closeLabel = $$props.closeLabel);
    		if ('cookieChoices' in $$props) cookieChoices = $$props.cookieChoices;
    		if ('choicesMerged' in $$props) $$invalidate(6, choicesMerged = $$props.choicesMerged);
    		if ('choicesArr' in $$props) $$invalidate(7, choicesArr = $$props.choicesArr);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*choices*/ 16384) {
    			$$invalidate(6, choicesMerged = Object.assign({}, choicesDefaults, choices));
    		}

    		if ($$self.$$.dirty & /*choicesMerged*/ 64) {
    			$$invalidate(7, choicesArr = Object.values(choicesMerged).map((item, index) => {
    				return Object.assign({}, item, { id: Object.keys(choicesMerged)[index] });
    			}));
    		}

    		if ($$self.$$.dirty & /*choicesArr*/ 128) {
    			cookieChoices = choicesArr.reduce(
    				(result, item, index, array) => {
    					result[item.id] = item.value ? item.value : false;
    					return result;
    				},
    				{}
    			);
    		}
    	};

    	return [
    		heading,
    		description_1,
    		description_2,
    		acceptLabel,
    		settingsLabel,
    		closeLabel,
    		choicesMerged,
    		choicesArr,
    		shown,
    		settingsShown,
    		choose,
    		cookieName,
    		categories,
    		cookieConfig,
    		choices,
    		show,
    		click_handler,
    		input_change_handler,
    		click_handler_1
    	];
    }

    class GdprCookies extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init$1(this, options, instance$2, create_fragment$2, safe_not_equal, {
    			cookieName: 11,
    			heading: 0,
    			description_1: 1,
    			description_2: 2,
    			categories: 12,
    			cookieConfig: 13,
    			choices: 14,
    			acceptLabel: 3,
    			settingsLabel: 4,
    			closeLabel: 5,
    			show: 15
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "GdprCookies",
    			options,
    			id: create_fragment$2.name
    		});
    	}

    	get cookieName() {
    		throw new Error_1("<GdprCookies>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set cookieName(value) {
    		throw new Error_1("<GdprCookies>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get heading() {
    		throw new Error_1("<GdprCookies>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set heading(value) {
    		throw new Error_1("<GdprCookies>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get description_1() {
    		throw new Error_1("<GdprCookies>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set description_1(value) {
    		throw new Error_1("<GdprCookies>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get description_2() {
    		throw new Error_1("<GdprCookies>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set description_2(value) {
    		throw new Error_1("<GdprCookies>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get categories() {
    		throw new Error_1("<GdprCookies>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set categories(value) {
    		throw new Error_1("<GdprCookies>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get cookieConfig() {
    		throw new Error_1("<GdprCookies>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set cookieConfig(value) {
    		throw new Error_1("<GdprCookies>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get choices() {
    		throw new Error_1("<GdprCookies>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set choices(value) {
    		throw new Error_1("<GdprCookies>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get acceptLabel() {
    		throw new Error_1("<GdprCookies>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set acceptLabel(value) {
    		throw new Error_1("<GdprCookies>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get settingsLabel() {
    		throw new Error_1("<GdprCookies>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set settingsLabel(value) {
    		throw new Error_1("<GdprCookies>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get closeLabel() {
    		throw new Error_1("<GdprCookies>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set closeLabel(value) {
    		throw new Error_1("<GdprCookies>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get show() {
    		return this.$$.ctx[15];
    	}

    	set show(value) {
    		throw new Error_1("<GdprCookies>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\Game.svelte generated by Svelte v3.46.4 */
    const file = "src\\components\\Game.svelte";

    // (206:0) <Modal          bind:visible={showTutorial}          fullscreen={$settings.tutorial === 0}          on:close|once={() => $settings.tutorial === 3 && --$settings.tutorial}>
    function create_default_slot_5(ctx) {
    	let tutorial;
    	let current;

    	tutorial = new Tutorial({
    			props: { visible: /*showTutorial*/ ctx[10] },
    			$$inline: true
    		});

    	tutorial.$on("changelog", /*changelog_handler*/ ctx[32]);
    	tutorial.$on("contact", /*contact_handler*/ ctx[33]);

    	const block = {
    		c: function create() {
    			create_component(tutorial.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(tutorial, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const tutorial_changes = {};
    			if (dirty[0] & /*showTutorial*/ 1024) tutorial_changes.visible = /*showTutorial*/ ctx[10];
    			tutorial.$set(tutorial_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(tutorial.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(tutorial.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(tutorial, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_5.name,
    		type: "slot",
    		source: "(206:0) <Modal          bind:visible={showTutorial}          fullscreen={$settings.tutorial === 0}          on:close|once={() => $settings.tutorial === 3 && --$settings.tutorial}>",
    		ctx
    	});

    	return block;
    }

    // (222:0) <Modal>
    function create_default_slot_4(ctx) {
    	let updater;
    	let current;
    	updater = new Updater({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(updater.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(updater, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(updater.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(updater.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(updater, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4.name,
    		type: "slot",
    		source: "(222:0) <Modal>",
    		ctx
    	});

    	return block;
    }

    // (226:0) <Modal          bind:visible={showContact}>
    function create_default_slot_3(ctx) {
    	let contact;
    	let current;

    	contact = new Contact({
    			props: { visible: /*showContact*/ ctx[4] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(contact.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(contact, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const contact_changes = {};
    			if (dirty[0] & /*showContact*/ 16) contact_changes.visible = /*showContact*/ ctx[4];
    			contact.$set(contact_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(contact.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(contact.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(contact, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3.name,
    		type: "slot",
    		source: "(226:0) <Modal          bind:visible={showContact}>",
    		ctx
    	});

    	return block;
    }

    // (231:0) <Modal          bind:visible={showChangeLog}>
    function create_default_slot_2(ctx) {
    	let changelog;
    	let current;

    	changelog = new ChangeLog({
    			props: { visible: /*showChangeLog*/ ctx[5] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(changelog.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(changelog, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const changelog_changes = {};
    			if (dirty[0] & /*showChangeLog*/ 32) changelog_changes.visible = /*showChangeLog*/ ctx[5];
    			changelog.$set(changelog_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(changelog.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(changelog.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(changelog, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(231:0) <Modal          bind:visible={showChangeLog}>",
    		ctx
    	});

    	return block;
    }

    // (239:4) {:else}
    function create_else_block_1(ctx) {
    	let statistics;
    	let t;
    	let distribution;
    	let current;

    	statistics = new Statistics({
    			props: { data: /*stats*/ ctx[2] },
    			$$inline: true
    		});

    	distribution = new Distribution({
    			props: {
    				distribution: /*stats*/ ctx[2].guesses,
    				game: /*game*/ ctx[3]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(statistics.$$.fragment);
    			t = space();
    			create_component(distribution.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(statistics, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(distribution, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const statistics_changes = {};
    			if (dirty[0] & /*stats*/ 4) statistics_changes.data = /*stats*/ ctx[2];
    			statistics.$set(statistics_changes);
    			const distribution_changes = {};
    			if (dirty[0] & /*stats*/ 4) distribution_changes.distribution = /*stats*/ ctx[2].guesses;
    			if (dirty[0] & /*game*/ 8) distribution_changes.game = /*game*/ ctx[3];
    			distribution.$set(distribution_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(statistics.$$.fragment, local);
    			transition_in(distribution.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(statistics.$$.fragment, local);
    			transition_out(distribution.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(statistics, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(distribution, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block_1.name,
    		type: "else",
    		source: "(239:4) {:else}",
    		ctx
    	});

    	return block;
    }

    // (237:4) {#if modeData.modes[$mode].historical}
    function create_if_block_2(ctx) {
    	let h2;

    	const block = {
    		c: function create() {
    			h2 = element("h2");
    			h2.textContent = "Statistics not available for historical games";
    			attr_dev(h2, "class", "historical svelte-1ixvu6x");
    			add_location(h2, file, 237, 8, 8045);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h2, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h2);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(237:4) {#if modeData.modes[$mode].historical}",
    		ctx
    	});

    	return block;
    }

    // (244:8) 
    function create__1_slot(ctx) {
    	let timer_1;
    	let current;
    	let timer_1_props = { slot: "1" };
    	timer_1 = new Timer({ props: timer_1_props, $$inline: true });
    	/*timer_1_binding*/ ctx[38](timer_1);
    	timer_1.$on("reload", /*reload*/ ctx[20]);
    	timer_1.$on("timeup", /*timeup_handler*/ ctx[39]);

    	const block = {
    		c: function create() {
    			create_component(timer_1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(timer_1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const timer_1_changes = {};
    			timer_1.$set(timer_1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(timer_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(timer_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			/*timer_1_binding*/ ctx[38](null);
    			destroy_component(timer_1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create__1_slot.name,
    		type: "slot",
    		source: "(244:8) ",
    		ctx
    	});

    	return block;
    }

    // (250:8) 
    function create__2_slot(ctx) {
    	let share;
    	let current;

    	share = new Share({
    			props: { slot: "2", state: /*game*/ ctx[3] },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(share.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(share, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const share_changes = {};
    			if (dirty[0] & /*game*/ 8) share_changes.state = /*game*/ ctx[3];
    			share.$set(share_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(share.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(share.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(share, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create__2_slot.name,
    		type: "slot",
    		source: "(250:8) ",
    		ctx
    	});

    	return block;
    }

    // (255:8) {:else}
    function create_else_block(ctx) {
    	let div;
    	let div_intro;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			div.textContent = "give up";
    			attr_dev(div, "class", "concede svelte-1ixvu6x");
    			add_location(div, file, 256, 2, 8776);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (!mounted) {
    				dispose = listen_dev(div, "click", /*concede*/ ctx[19], false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop,
    		i: function intro(local) {
    			if (!div_intro) {
    				add_render_callback(() => {
    					div_intro = create_in_transition(div, fade, { delay: 300 });
    					div_intro.start();
    				});
    			}
    		},
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(255:8) {:else}",
    		ctx
    	});

    	return block;
    }

    // (253:4) {#if !game.active}
    function create_if_block_1(ctx) {
    	let definition;
    	let current;

    	definition = new Definition({
    			props: { word: /*word*/ ctx[0], alternates: 2 },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(definition.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(definition, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const definition_changes = {};
    			if (dirty[0] & /*word*/ 1) definition_changes.word = /*word*/ ctx[0];
    			definition.$set(definition_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(definition.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(definition.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(definition, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(253:4) {#if !game.active}",
    		ctx
    	});

    	return block;
    }

    // (236:0) <Modal bind:visible={showStats}>
    function create_default_slot_1(ctx) {
    	let current_block_type_index;
    	let if_block0;
    	let t0;
    	let seperator;
    	let t1;
    	let sharegame;
    	let t2;
    	let current_block_type_index_1;
    	let if_block1;
    	let if_block1_anchor;
    	let current;
    	const if_block_creators = [create_if_block_2, create_else_block_1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*modeData*/ ctx[9].modes[/*$mode*/ ctx[15]].historical) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	seperator = new Seperator({
    			props: {
    				visible: !/*game*/ ctx[3].active,
    				$$slots: {
    					"2": [create__2_slot],
    					"1": [create__1_slot]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	sharegame = new ShareGame({
    			props: {
    				state: /*game*/ ctx[3],
    				wordNumber: /*game*/ ctx[3].wordNumber
    			},
    			$$inline: true
    		});

    	const if_block_creators_1 = [create_if_block_1, create_else_block];
    	const if_blocks_1 = [];

    	function select_block_type_1(ctx, dirty) {
    		if (!/*game*/ ctx[3].active) return 0;
    		return 1;
    	}

    	current_block_type_index_1 = select_block_type_1(ctx);
    	if_block1 = if_blocks_1[current_block_type_index_1] = if_block_creators_1[current_block_type_index_1](ctx);

    	const block = {
    		c: function create() {
    			if_block0.c();
    			t0 = space();
    			create_component(seperator.$$.fragment);
    			t1 = space();
    			create_component(sharegame.$$.fragment);
    			t2 = space();
    			if_block1.c();
    			if_block1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(seperator, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(sharegame, target, anchor);
    			insert_dev(target, t2, anchor);
    			if_blocks_1[current_block_type_index_1].m(target, anchor);
    			insert_dev(target, if_block1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block0 = if_blocks[current_block_type_index];

    				if (!if_block0) {
    					if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block0.c();
    				} else {
    					if_block0.p(ctx, dirty);
    				}

    				transition_in(if_block0, 1);
    				if_block0.m(t0.parentNode, t0);
    			}

    			const seperator_changes = {};
    			if (dirty[0] & /*game*/ 8) seperator_changes.visible = !/*game*/ ctx[3].active;

    			if (dirty[0] & /*game, timer, showRefresh*/ 10248 | dirty[1] & /*$$scope*/ 134217728) {
    				seperator_changes.$$scope = { dirty, ctx };
    			}

    			seperator.$set(seperator_changes);
    			const sharegame_changes = {};
    			if (dirty[0] & /*game*/ 8) sharegame_changes.state = /*game*/ ctx[3];
    			if (dirty[0] & /*game*/ 8) sharegame_changes.wordNumber = /*game*/ ctx[3].wordNumber;
    			sharegame.$set(sharegame_changes);
    			let previous_block_index_1 = current_block_type_index_1;
    			current_block_type_index_1 = select_block_type_1(ctx);

    			if (current_block_type_index_1 === previous_block_index_1) {
    				if_blocks_1[current_block_type_index_1].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks_1[previous_block_index_1], 1, 1, () => {
    					if_blocks_1[previous_block_index_1] = null;
    				});

    				check_outros();
    				if_block1 = if_blocks_1[current_block_type_index_1];

    				if (!if_block1) {
    					if_block1 = if_blocks_1[current_block_type_index_1] = if_block_creators_1[current_block_type_index_1](ctx);
    					if_block1.c();
    				} else {
    					if_block1.p(ctx, dirty);
    				}

    				transition_in(if_block1, 1);
    				if_block1.m(if_block1_anchor.parentNode, if_block1_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			transition_in(seperator.$$.fragment, local);
    			transition_in(sharegame.$$.fragment, local);
    			transition_in(if_block1);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			transition_out(seperator.$$.fragment, local);
    			transition_out(sharegame.$$.fragment, local);
    			transition_out(if_block1);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(seperator, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(sharegame, detaching);
    			if (detaching) detach_dev(t2);
    			if_blocks_1[current_block_type_index_1].d(detaching);
    			if (detaching) detach_dev(if_block1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(236:0) <Modal bind:visible={showStats}>",
    		ctx
    	});

    	return block;
    }

    // (271:4) {#if game.active}
    function create_if_block$1(ctx) {
    	let div;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div = element("div");
    			div.textContent = "give up";
    			attr_dev(div, "class", "concede svelte-1ixvu6x");
    			add_location(div, file, 271, 8, 9184);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			if (!mounted) {
    				dispose = listen_dev(div, "click", /*concede*/ ctx[19], false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(271:4) {#if game.active}",
    		ctx
    	});

    	return block;
    }

    // (261:0) <Modal            bind:visible={showSettings} fullscreen={true}>
    function create_default_slot(ctx) {
    	let settings_1;
    	let t0;
    	let t1;
    	let tips_1;
    	let current;

    	settings_1 = new Settings({
    			props: { state: /*game*/ ctx[3] },
    			$$inline: true
    		});

    	settings_1.$on("contact", /*contact_handler_1*/ ctx[44]);
    	settings_1.$on("showChangeLog", /*showChangeLog_handler*/ ctx[45]);
    	let if_block = /*game*/ ctx[3].active && create_if_block$1(ctx);
    	let tips_1_props = { index: /*tip*/ ctx[14] };
    	tips_1 = new Tips({ props: tips_1_props, $$inline: true });
    	/*tips_1_binding*/ ctx[46](tips_1);

    	const block = {
    		c: function create() {
    			create_component(settings_1.$$.fragment);
    			t0 = space();
    			if (if_block) if_block.c();
    			t1 = space();
    			create_component(tips_1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(settings_1, target, anchor);
    			insert_dev(target, t0, anchor);
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(tips_1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const settings_1_changes = {};
    			if (dirty[0] & /*game*/ 8) settings_1_changes.state = /*game*/ ctx[3];
    			settings_1.$set(settings_1_changes);

    			if (/*game*/ ctx[3].active) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$1(ctx);
    					if_block.c();
    					if_block.m(t1.parentNode, t1);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			const tips_1_changes = {};
    			if (dirty[0] & /*tip*/ 16384) tips_1_changes.index = /*tip*/ ctx[14];
    			tips_1.$set(tips_1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(settings_1.$$.fragment, local);
    			transition_in(tips_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(settings_1.$$.fragment, local);
    			transition_out(tips_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(settings_1, detaching);
    			if (detaching) detach_dev(t0);
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(t1);
    			/*tips_1_binding*/ ctx[46](null);
    			destroy_component(tips_1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(261:0) <Modal            bind:visible={showSettings} fullscreen={true}>",
    		ctx
    	});

    	return block;
    }

    // (276:4) 
    function create_footer_slot(ctx) {
    	let div5;
    	let div0;
    	let t1;
    	let div1;
    	let t3;
    	let a;
    	let t5;
    	let div4;
    	let div2;
    	let t8;
    	let div3;
    	let t9_value = /*modeData*/ ctx[9].modes[/*$mode*/ ctx[15]].name + "";
    	let t9;
    	let t10;
    	let t11_value = /*game*/ ctx[3].wordNumber + "";
    	let t11;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div5 = element("div");
    			div0 = element("div");
    			div0.textContent = "Contact";
    			t1 = space();
    			div1 = element("div");
    			div1.textContent = "ChangeLog";
    			t3 = space();
    			a = element("a");
    			a.textContent = "Original Wordle";
    			t5 = space();
    			div4 = element("div");
    			div2 = element("div");
    			div2.textContent = `v${/*version*/ ctx[17]}`;
    			t8 = space();
    			div3 = element("div");
    			t9 = text(t9_value);
    			t10 = text(" Foodle #");
    			t11 = text(t11_value);
    			set_style(div0, "text-decoration", "underline");
    			add_location(div0, file, 277, 8, 9329);
    			set_style(div1, "text-decoration", "underline");
    			add_location(div1, file, 282, 8, 9474);
    			attr_dev(a, "href", "https://www.nytimes.com/games/wordle/");
    			attr_dev(a, "target", "_blank");
    			add_location(a, file, 287, 8, 9623);
    			add_location(div2, file, 289, 12, 9735);
    			attr_dev(div3, "class", "word");
    			attr_dev(div3, "title", "double click to reset your stats");
    			add_location(div3, file, 290, 12, 9770);
    			add_location(div4, file, 288, 8, 9716);
    			attr_dev(div5, "slot", "footer");
    			add_location(div5, file, 275, 4, 9298);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div5, anchor);
    			append_dev(div5, div0);
    			append_dev(div5, t1);
    			append_dev(div5, div1);
    			append_dev(div5, t3);
    			append_dev(div5, a);
    			append_dev(div5, t5);
    			append_dev(div5, div4);
    			append_dev(div4, div2);
    			append_dev(div4, t8);
    			append_dev(div4, div3);
    			append_dev(div3, t9);
    			append_dev(div3, t10);
    			append_dev(div3, t11);

    			if (!mounted) {
    				dispose = [
    					listen_dev(div0, "click", /*click_handler*/ ctx[41], false, false, false),
    					listen_dev(div1, "click", /*click_handler_1*/ ctx[42], false, false, false),
    					listen_dev(div3, "dblclick", /*dblclick_handler*/ ctx[43], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty[0] & /*modeData, $mode*/ 33280 && t9_value !== (t9_value = /*modeData*/ ctx[9].modes[/*$mode*/ ctx[15]].name + "")) set_data_dev(t9, t9_value);
    			if (dirty[0] & /*game*/ 8 && t11_value !== (t11_value = /*game*/ ctx[3].wordNumber + "")) set_data_dev(t11, t11_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div5);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_footer_slot.name,
    		type: "slot",
    		source: "(276:4) ",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let t0;
    	let main;
    	let header;
    	let updating_showRefresh;
    	let t1;
    	let board_1;
    	let updating_value;
    	let t2;
    	let keyboard;
    	let updating_value_1;
    	let t3;
    	let modal0;
    	let updating_visible;
    	let t4;
    	let gdprbanner;
    	let t5;
    	let modal1;
    	let t6;
    	let modal2;
    	let updating_visible_1;
    	let t7;
    	let modal3;
    	let updating_visible_2;
    	let t8;
    	let modal4;
    	let updating_visible_3;
    	let t9;
    	let modal5;
    	let updating_visible_4;
    	let current;
    	let mounted;
    	let dispose;

    	function header_showRefresh_binding(value) {
    		/*header_showRefresh_binding*/ ctx[21](value);
    	}

    	let header_props = {
    		showStats: /*stats*/ ctx[2].played > 0 || /*modeData*/ ctx[9].modes[/*$mode*/ ctx[15]].historical && !/*game*/ ctx[3].active,
    		tutorial: /*$settings*/ ctx[16].tutorial === 2
    	};

    	if (/*showRefresh*/ ctx[11] !== void 0) {
    		header_props.showRefresh = /*showRefresh*/ ctx[11];
    	}

    	header = new Header({ props: header_props, $$inline: true });
    	binding_callbacks.push(() => bind(header, 'showRefresh', header_showRefresh_binding));
    	header.$on("closeTutPopUp", once(/*closeTutPopUp_handler*/ ctx[22]));
    	header.$on("reload", /*reload*/ ctx[20]);
    	header.$on("settings", /*settings_handler*/ ctx[23]);
    	header.$on("stats", /*stats_handler*/ ctx[24]);
    	header.$on("tutorial", /*tutorial_handler*/ ctx[25]);

    	function board_1_value_binding(value) {
    		/*board_1_value_binding*/ ctx[27](value);
    	}

    	let board_1_props = {
    		board: /*game*/ ctx[3].board,
    		guesses: /*game*/ ctx[3].guesses,
    		icon: /*modeData*/ ctx[9].modes[/*$mode*/ ctx[15]].icon,
    		tutorial: /*$settings*/ ctx[16].tutorial === 1
    	};

    	if (/*game*/ ctx[3].board.words !== void 0) {
    		board_1_props.value = /*game*/ ctx[3].board.words;
    	}

    	board_1 = new Board({ props: board_1_props, $$inline: true });
    	/*board_1_binding*/ ctx[26](board_1);
    	binding_callbacks.push(() => bind(board_1, 'value', board_1_value_binding));
    	board_1.$on("closeTutPopUp", once(/*closeTutPopUp_handler_1*/ ctx[28]));

    	function keyboard_value_binding(value) {
    		/*keyboard_value_binding*/ ctx[29](value);
    	}

    	let keyboard_props = {
    		disabled: !/*game*/ ctx[3].active || /*$settings*/ ctx[16].tutorial === 3
    	};

    	if (/*game*/ ctx[3].board.words[/*game*/ ctx[3].guesses === ROWS
    	? 0
    	: /*game*/ ctx[3].guesses] !== void 0) {
    		keyboard_props.value = /*game*/ ctx[3].board.words[/*game*/ ctx[3].guesses === ROWS
    		? 0
    		: /*game*/ ctx[3].guesses];
    	}

    	keyboard = new Keyboard({ props: keyboard_props, $$inline: true });
    	binding_callbacks.push(() => bind(keyboard, 'value', keyboard_value_binding));
    	keyboard.$on("esc", /*esc_handler*/ ctx[30]);
    	keyboard.$on("keystroke", /*keystroke_handler*/ ctx[31]);
    	keyboard.$on("submitWord", /*submitWord*/ ctx[18]);

    	function modal0_visible_binding(value) {
    		/*modal0_visible_binding*/ ctx[34](value);
    	}

    	let modal0_props = {
    		fullscreen: /*$settings*/ ctx[16].tutorial === 0,
    		$$slots: { default: [create_default_slot_5] },
    		$$scope: { ctx }
    	};

    	if (/*showTutorial*/ ctx[10] !== void 0) {
    		modal0_props.visible = /*showTutorial*/ ctx[10];
    	}

    	modal0 = new Modal({ props: modal0_props, $$inline: true });
    	binding_callbacks.push(() => bind(modal0, 'visible', modal0_visible_binding));
    	modal0.$on("close", once(/*close_handler*/ ctx[35]));
    	gdprbanner = new GdprCookies({ $$inline: true });

    	modal1 = new Modal({
    			props: {
    				$$slots: { default: [create_default_slot_4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	function modal2_visible_binding(value) {
    		/*modal2_visible_binding*/ ctx[36](value);
    	}

    	let modal2_props = {
    		$$slots: { default: [create_default_slot_3] },
    		$$scope: { ctx }
    	};

    	if (/*showContact*/ ctx[4] !== void 0) {
    		modal2_props.visible = /*showContact*/ ctx[4];
    	}

    	modal2 = new Modal({ props: modal2_props, $$inline: true });
    	binding_callbacks.push(() => bind(modal2, 'visible', modal2_visible_binding));

    	function modal3_visible_binding(value) {
    		/*modal3_visible_binding*/ ctx[37](value);
    	}

    	let modal3_props = {
    		$$slots: { default: [create_default_slot_2] },
    		$$scope: { ctx }
    	};

    	if (/*showChangeLog*/ ctx[5] !== void 0) {
    		modal3_props.visible = /*showChangeLog*/ ctx[5];
    	}

    	modal3 = new Modal({ props: modal3_props, $$inline: true });
    	binding_callbacks.push(() => bind(modal3, 'visible', modal3_visible_binding));

    	function modal4_visible_binding(value) {
    		/*modal4_visible_binding*/ ctx[40](value);
    	}

    	let modal4_props = {
    		$$slots: { default: [create_default_slot_1] },
    		$$scope: { ctx }
    	};

    	if (/*showStats*/ ctx[1] !== void 0) {
    		modal4_props.visible = /*showStats*/ ctx[1];
    	}

    	modal4 = new Modal({ props: modal4_props, $$inline: true });
    	binding_callbacks.push(() => bind(modal4, 'visible', modal4_visible_binding));

    	function modal5_visible_binding(value) {
    		/*modal5_visible_binding*/ ctx[47](value);
    	}

    	let modal5_props = {
    		fullscreen: true,
    		$$slots: {
    			footer: [create_footer_slot],
    			default: [create_default_slot]
    		},
    		$$scope: { ctx }
    	};

    	if (/*showSettings*/ ctx[7] !== void 0) {
    		modal5_props.visible = /*showSettings*/ ctx[7];
    	}

    	modal5 = new Modal({ props: modal5_props, $$inline: true });
    	binding_callbacks.push(() => bind(modal5, 'visible', modal5_visible_binding));

    	const block = {
    		c: function create() {
    			t0 = space();
    			main = element("main");
    			create_component(header.$$.fragment);
    			t1 = space();
    			create_component(board_1.$$.fragment);
    			t2 = space();
    			create_component(keyboard.$$.fragment);
    			t3 = space();
    			create_component(modal0.$$.fragment);
    			t4 = space();
    			create_component(gdprbanner.$$.fragment);
    			t5 = space();
    			create_component(modal1.$$.fragment);
    			t6 = space();
    			create_component(modal2.$$.fragment);
    			t7 = space();
    			create_component(modal3.$$.fragment);
    			t8 = space();
    			create_component(modal4.$$.fragment);
    			t9 = space();
    			create_component(modal5.$$.fragment);
    			set_style(main, "--rows", ROWS);
    			set_style(main, "--cols", COLS);
    			attr_dev(main, "class", "svelte-1ixvu6x");
    			toggle_class(main, "guesses", /*game*/ ctx[3].guesses !== 0);
    			add_location(main, file, 166, 0, 5933);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, main, anchor);
    			mount_component(header, main, null);
    			append_dev(main, t1);
    			mount_component(board_1, main, null);
    			append_dev(main, t2);
    			mount_component(keyboard, main, null);
    			insert_dev(target, t3, anchor);
    			mount_component(modal0, target, anchor);
    			insert_dev(target, t4, anchor);
    			mount_component(gdprbanner, target, anchor);
    			insert_dev(target, t5, anchor);
    			mount_component(modal1, target, anchor);
    			insert_dev(target, t6, anchor);
    			mount_component(modal2, target, anchor);
    			insert_dev(target, t7, anchor);
    			mount_component(modal3, target, anchor);
    			insert_dev(target, t8, anchor);
    			mount_component(modal4, target, anchor);
    			insert_dev(target, t9, anchor);
    			mount_component(modal5, target, anchor);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(
    						document.body,
    						"click",
    						function () {
    							if (is_function(/*board*/ ctx[12].hideCtx)) /*board*/ ctx[12].hideCtx.apply(this, arguments);
    						},
    						false,
    						false,
    						false
    					),
    					listen_dev(
    						document.body,
    						"contextmenu",
    						function () {
    							if (is_function(/*board*/ ctx[12].hideCtx)) /*board*/ ctx[12].hideCtx.apply(this, arguments);
    						},
    						false,
    						false,
    						false
    					)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const header_changes = {};
    			if (dirty[0] & /*stats, modeData, $mode, game*/ 33292) header_changes.showStats = /*stats*/ ctx[2].played > 0 || /*modeData*/ ctx[9].modes[/*$mode*/ ctx[15]].historical && !/*game*/ ctx[3].active;
    			if (dirty[0] & /*$settings*/ 65536) header_changes.tutorial = /*$settings*/ ctx[16].tutorial === 2;

    			if (!updating_showRefresh && dirty[0] & /*showRefresh*/ 2048) {
    				updating_showRefresh = true;
    				header_changes.showRefresh = /*showRefresh*/ ctx[11];
    				add_flush_callback(() => updating_showRefresh = false);
    			}

    			header.$set(header_changes);
    			const board_1_changes = {};
    			if (dirty[0] & /*game*/ 8) board_1_changes.board = /*game*/ ctx[3].board;
    			if (dirty[0] & /*game*/ 8) board_1_changes.guesses = /*game*/ ctx[3].guesses;
    			if (dirty[0] & /*modeData, $mode*/ 33280) board_1_changes.icon = /*modeData*/ ctx[9].modes[/*$mode*/ ctx[15]].icon;
    			if (dirty[0] & /*$settings*/ 65536) board_1_changes.tutorial = /*$settings*/ ctx[16].tutorial === 1;

    			if (!updating_value && dirty[0] & /*game*/ 8) {
    				updating_value = true;
    				board_1_changes.value = /*game*/ ctx[3].board.words;
    				add_flush_callback(() => updating_value = false);
    			}

    			board_1.$set(board_1_changes);
    			const keyboard_changes = {};
    			if (dirty[0] & /*game, $settings*/ 65544) keyboard_changes.disabled = !/*game*/ ctx[3].active || /*$settings*/ ctx[16].tutorial === 3;

    			if (!updating_value_1 && dirty[0] & /*game*/ 8) {
    				updating_value_1 = true;

    				keyboard_changes.value = /*game*/ ctx[3].board.words[/*game*/ ctx[3].guesses === ROWS
    				? 0
    				: /*game*/ ctx[3].guesses];

    				add_flush_callback(() => updating_value_1 = false);
    			}

    			keyboard.$set(keyboard_changes);

    			if (dirty[0] & /*game*/ 8) {
    				toggle_class(main, "guesses", /*game*/ ctx[3].guesses !== 0);
    			}

    			const modal0_changes = {};
    			if (dirty[0] & /*$settings*/ 65536) modal0_changes.fullscreen = /*$settings*/ ctx[16].tutorial === 0;

    			if (dirty[0] & /*showTutorial, showChangeLog, showContact*/ 1072 | dirty[1] & /*$$scope*/ 134217728) {
    				modal0_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_visible && dirty[0] & /*showTutorial*/ 1024) {
    				updating_visible = true;
    				modal0_changes.visible = /*showTutorial*/ ctx[10];
    				add_flush_callback(() => updating_visible = false);
    			}

    			modal0.$set(modal0_changes);
    			const modal1_changes = {};

    			if (dirty[1] & /*$$scope*/ 134217728) {
    				modal1_changes.$$scope = { dirty, ctx };
    			}

    			modal1.$set(modal1_changes);
    			const modal2_changes = {};

    			if (dirty[0] & /*showContact*/ 16 | dirty[1] & /*$$scope*/ 134217728) {
    				modal2_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_visible_1 && dirty[0] & /*showContact*/ 16) {
    				updating_visible_1 = true;
    				modal2_changes.visible = /*showContact*/ ctx[4];
    				add_flush_callback(() => updating_visible_1 = false);
    			}

    			modal2.$set(modal2_changes);
    			const modal3_changes = {};

    			if (dirty[0] & /*showChangeLog*/ 32 | dirty[1] & /*$$scope*/ 134217728) {
    				modal3_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_visible_2 && dirty[0] & /*showChangeLog*/ 32) {
    				updating_visible_2 = true;
    				modal3_changes.visible = /*showChangeLog*/ ctx[5];
    				add_flush_callback(() => updating_visible_2 = false);
    			}

    			modal3.$set(modal3_changes);
    			const modal4_changes = {};

    			if (dirty[0] & /*word, game, timer, showRefresh, modeData, $mode, stats*/ 43533 | dirty[1] & /*$$scope*/ 134217728) {
    				modal4_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_visible_3 && dirty[0] & /*showStats*/ 2) {
    				updating_visible_3 = true;
    				modal4_changes.visible = /*showStats*/ ctx[1];
    				add_flush_callback(() => updating_visible_3 = false);
    			}

    			modal4.$set(modal4_changes);
    			const modal5_changes = {};

    			if (dirty[0] & /*toaster, game, modeData, $mode, showSettings, showChangeLog, showContact, tip, tips*/ 50168 | dirty[1] & /*$$scope*/ 134217728) {
    				modal5_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_visible_4 && dirty[0] & /*showSettings*/ 128) {
    				updating_visible_4 = true;
    				modal5_changes.visible = /*showSettings*/ ctx[7];
    				add_flush_callback(() => updating_visible_4 = false);
    			}

    			modal5.$set(modal5_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(header.$$.fragment, local);
    			transition_in(board_1.$$.fragment, local);
    			transition_in(keyboard.$$.fragment, local);
    			transition_in(modal0.$$.fragment, local);
    			transition_in(gdprbanner.$$.fragment, local);
    			transition_in(modal1.$$.fragment, local);
    			transition_in(modal2.$$.fragment, local);
    			transition_in(modal3.$$.fragment, local);
    			transition_in(modal4.$$.fragment, local);
    			transition_in(modal5.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(header.$$.fragment, local);
    			transition_out(board_1.$$.fragment, local);
    			transition_out(keyboard.$$.fragment, local);
    			transition_out(modal0.$$.fragment, local);
    			transition_out(gdprbanner.$$.fragment, local);
    			transition_out(modal1.$$.fragment, local);
    			transition_out(modal2.$$.fragment, local);
    			transition_out(modal3.$$.fragment, local);
    			transition_out(modal4.$$.fragment, local);
    			transition_out(modal5.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(main);
    			destroy_component(header);
    			/*board_1_binding*/ ctx[26](null);
    			destroy_component(board_1);
    			destroy_component(keyboard);
    			if (detaching) detach_dev(t3);
    			destroy_component(modal0, detaching);
    			if (detaching) detach_dev(t4);
    			destroy_component(gdprbanner, detaching);
    			if (detaching) detach_dev(t5);
    			destroy_component(modal1, detaching);
    			if (detaching) detach_dev(t6);
    			destroy_component(modal2, detaching);
    			if (detaching) detach_dev(t7);
    			destroy_component(modal3, detaching);
    			if (detaching) detach_dev(t8);
    			destroy_component(modal4, detaching);
    			if (detaching) detach_dev(t9);
    			destroy_component(modal5, detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let $mode;
    	let $letterStates;
    	let $settings;
    	validate_store(mode, 'mode');
    	component_subscribe($$self, mode, $$value => $$invalidate(15, $mode = $$value));
    	validate_store(letterStates, 'letterStates');
    	component_subscribe($$self, letterStates, $$value => $$invalidate(49, $letterStates = $$value));
    	validate_store(settings, 'settings');
    	component_subscribe($$self, settings, $$value => $$invalidate(16, $settings = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Game', slots, []);
    	let { word } = $$props;
    	let { showStats = false } = $$props;
    	let { stats } = $$props;
    	let { game } = $$props;
    	let { toaster } = $$props;
    	words.active_words = words.food;
    	setContext("toaster", toaster);
    	const version = getContext("version");

    	// implement transition delay on keys
    	const delay = DELAY_INCREMENT * ROWS + 800;

    	let showTutorial = $settings.tutorial === 3;
    	let { showContact = false } = $$props;
    	let { showChangeLog = false } = $$props;
    	let showSettings = false;
    	let showRefresh = false;
    	let showCookieBanner = true;
    	let board;
    	let timer;
    	let tips;
    	let tip = 0;

    	function CheckFoodMode(state) {
    		if (state.foodOnly) {
    			words.active_words = words.food;
    		} else {
    			words.active_words = words.words;
    		}
    	}

    	function setContact(option) {
    		$$invalidate(4, showContact = option);
    	}

    	function setChangeLogVisibility(option) {
    		$$invalidate(5, showChangeLog = option);
    	}

    	window.addEventListener('hashchange', function () {
    		if (window.location.hash.substring(1) === 'contact') {
    			$$invalidate(4, showContact = true);
    		}
    	});

    	function submitWord() {
    		if (game.board.words[game.guesses].length !== COLS) {
    			toaster.pop("Not enough letters");
    			board.shake(game.guesses); //TODO: change stuff here
    		} else //console.log(game.board.words[game.guesses])  //DEBUG
    		//console.log(game.guesses)
    		//console.log(game.board.words)
    		if (words.contains(game.board.words[game.guesses])) {
    			//wordlist contains the word
    			if (game.guesses > 0) {
    				const hm = checkHardMode(game.board, game.guesses); //Checks if the word is missing letters

    				if ($settings.hard[$mode]) {
    					if (hm.type === "🟩") {
    						toaster.pop(`${contractNum(hm.pos + 1)} letter must be ${hm.char.toUpperCase()}`);
    						board.shake(game.guesses);
    						return;
    					} else if (hm.type === "🟨") {
    						toaster.pop(`Guess must contain ${hm.char.toUpperCase()}`);
    						board.shake(game.guesses);
    						return;
    					}
    				} else if (hm.type !== "⬛") {
    					$$invalidate(3, game.validHard = false, game);
    				}
    			}

    			const state = getState(word, game.board.words[game.guesses]);
    			$$invalidate(3, game.board.state[game.guesses] = state, game);

    			state.forEach((e, i) => {
    				const ls = $letterStates[game.board.words[game.guesses][i]];

    				if (ls === "🔳" || e === "🟩") {
    					set_store_value(letterStates, $letterStates[game.board.words[game.guesses][i]] = e, $letterStates);
    				}
    			});

    			$$invalidate(3, ++game.guesses, game);
    			if (game.board.words[game.guesses - 1] === word) win(); else if (game.guesses === ROWS) lose();
    		} else {
    			toaster.pop("Not in word list");
    			board.shake(game.guesses);
    		}
    	}

    	function win() {
    		// foodle api stuff
    		board.bounce(game.guesses - 1);

    		$$invalidate(3, game.active = false, game);
    		setTimeout(() => toaster.pop(PRAISE[game.guesses - 1]), DELAY_INCREMENT * COLS + DELAY_INCREMENT);
    		setTimeout(setShowStatsTrue, delay * 1.4);

    		if (!modeData.modes[$mode].historical) {
    			$$invalidate(2, ++stats.guesses[game.guesses], stats);
    			$$invalidate(2, ++stats.played, stats);

    			if ("streak" in stats) {
    				$$invalidate(
    					2,
    					stats.streak = modeData.modes[$mode].seed - stats.lastGame > modeData.modes[$mode].unit
    					? 1
    					: stats.streak + 1,
    					stats
    				);

    				if (stats.streak > stats.maxStreak) $$invalidate(2, stats.maxStreak = stats.streak, stats);
    			}

    			$$invalidate(2, stats.lastGame = modeData.modes[$mode].seed, stats);
    			localStorage.setItem(`stats-${$mode}`, JSON.stringify(stats));
    		}
    	}

    	function lose() {
    		// 	ga('send', 'event', 'game', 'foodle_lose', $mode);
    		$$invalidate(3, game.active = false, game);

    		setTimeout(setShowStatsTrue, delay);

    		if (!modeData.modes[$mode].historical) {
    			$$invalidate(2, ++stats.guesses.fail, stats);
    			$$invalidate(2, ++stats.played, stats);
    			if ("streak" in stats) $$invalidate(2, stats.streak = 0, stats);
    			$$invalidate(2, stats.lastGame = modeData.modes[$mode].seed, stats);
    			localStorage.setItem(`stats-${$mode}`, JSON.stringify(stats));
    		}
    	}

    	function concede() {
    		//	ga('send', 'event', 'game', 'foodle_give_up', $mode);
    		$$invalidate(7, showSettings = false);

    		setTimeout(setShowStatsTrue, DELAY_INCREMENT);
    		lose();
    	}

    	function setShowStatsTrue() {
    		if (!game.active) $$invalidate(1, showStats = true);
    	}

    	function reload() {
    		$$invalidate(9, modeData.modes[$mode].historical = false, modeData);
    		$$invalidate(9, modeData.modes[$mode].seed = newSeed($mode), modeData);
    		$$invalidate(3, game = createNewGame($mode));
    		$$invalidate(0, word = words.active_words[seededRandomInt(0, words.active_words.length, modeData.modes[$mode].seed)]);
    		set_store_value(letterStates, $letterStates = createLetterStates(), $letterStates);
    		$$invalidate(1, showStats = false);
    		$$invalidate(11, showRefresh = false);
    		timer.reset($mode);
    	}

    	onMount(() => {
    		if (!game.active) setTimeout(setShowStatsTrue, delay);
    	});

    	const writable_props = [
    		'word',
    		'showStats',
    		'stats',
    		'game',
    		'toaster',
    		'showContact',
    		'showChangeLog'
    	];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Game> was created with unknown prop '${key}'`);
    	});

    	function header_showRefresh_binding(value) {
    		showRefresh = value;
    		$$invalidate(11, showRefresh);
    	}

    	const closeTutPopUp_handler = () => set_store_value(settings, $settings.tutorial = 1, $settings);
    	const settings_handler = () => $$invalidate(7, showSettings = true);
    	const stats_handler = () => $$invalidate(1, showStats = true);
    	const tutorial_handler = () => $$invalidate(10, showTutorial = true);

    	function board_1_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			board = $$value;
    			$$invalidate(12, board);
    		});
    	}

    	function board_1_value_binding(value) {
    		if ($$self.$$.not_equal(game.board.words, value)) {
    			game.board.words = value;
    			$$invalidate(3, game);
    		}
    	}

    	const closeTutPopUp_handler_1 = () => set_store_value(settings, $settings.tutorial = 0, $settings);

    	function keyboard_value_binding(value) {
    		if ($$self.$$.not_equal(game.board.words[game.guesses === ROWS ? 0 : game.guesses], value)) {
    			game.board.words[game.guesses === ROWS ? 0 : game.guesses] = value;
    			$$invalidate(3, game);
    		}
    	}

    	const esc_handler = () => {
    		$$invalidate(10, showTutorial = false);
    		$$invalidate(1, showStats = false);
    		$$invalidate(7, showSettings = false);
    		$$invalidate(4, showContact = false);
    		$$invalidate(5, showChangeLog = false);
    	};

    	const keystroke_handler = () => {
    		if ($settings.tutorial) set_store_value(settings, $settings.tutorial = 0, $settings);
    		board.hideCtx();
    	};

    	const changelog_handler = () => {
    		$$invalidate(10, showTutorial = false);
    		$$invalidate(5, showChangeLog = true);
    	};

    	const contact_handler = () => {
    		$$invalidate(10, showTutorial = false);
    		$$invalidate(4, showContact = true);
    	};

    	function modal0_visible_binding(value) {
    		showTutorial = value;
    		$$invalidate(10, showTutorial);
    	}

    	const close_handler = () => $settings.tutorial === 3 && set_store_value(settings, --$settings.tutorial, $settings);

    	function modal2_visible_binding(value) {
    		showContact = value;
    		$$invalidate(4, showContact);
    	}

    	function modal3_visible_binding(value) {
    		showChangeLog = value;
    		$$invalidate(5, showChangeLog);
    	}

    	function timer_1_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			timer = $$value;
    			$$invalidate(13, timer);
    		});
    	}

    	const timeup_handler = () => $$invalidate(11, showRefresh = true);

    	function modal4_visible_binding(value) {
    		showStats = value;
    		$$invalidate(1, showStats);
    	}

    	const click_handler = () => {
    		$$invalidate(7, showSettings = false);
    		$$invalidate(4, showContact = true);
    	};

    	const click_handler_1 = () => {
    		$$invalidate(7, showSettings = false);
    		$$invalidate(5, showChangeLog = true);
    	};

    	const dblclick_handler = () => {
    		localStorage.clear();
    		toaster.pop("localStorage cleared");
    	};

    	const contact_handler_1 = () => {
    		$$invalidate(7, showSettings = false);
    		$$invalidate(4, showContact = true);
    	};

    	const showChangeLog_handler = () => {
    		$$invalidate(7, showSettings = false);
    		$$invalidate(5, showChangeLog = true);
    	};

    	function tips_1_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			tips = $$value;
    			$$invalidate(8, tips);
    		});
    	}

    	function modal5_visible_binding(value) {
    		showSettings = value;
    		$$invalidate(7, showSettings);
    	}

    	$$self.$$set = $$props => {
    		if ('word' in $$props) $$invalidate(0, word = $$props.word);
    		if ('showStats' in $$props) $$invalidate(1, showStats = $$props.showStats);
    		if ('stats' in $$props) $$invalidate(2, stats = $$props.stats);
    		if ('game' in $$props) $$invalidate(3, game = $$props.game);
    		if ('toaster' in $$props) $$invalidate(6, toaster = $$props.toaster);
    		if ('showContact' in $$props) $$invalidate(4, showContact = $$props.showContact);
    		if ('showChangeLog' in $$props) $$invalidate(5, showChangeLog = $$props.showChangeLog);
    	};

    	$$self.$capture_state = () => ({
    		fade,
    		Header,
    		Board,
    		Keyboard,
    		Modal,
    		getContext,
    		onMount,
    		setContext,
    		Settings,
    		Share,
    		Seperator,
    		Definition,
    		Contact,
    		ChangeLog,
    		Tutorial,
    		Statistics,
    		Distribution,
    		Timer,
    		Toaster,
    		ShareGame,
    		Updater,
    		Tips,
    		contractNum,
    		DELAY_INCREMENT,
    		PRAISE,
    		getState,
    		modeData,
    		checkHardMode,
    		ROWS,
    		COLS,
    		newSeed,
    		createNewGame,
    		seededRandomInt,
    		createLetterStates,
    		words,
    		letterStates,
    		settings,
    		mode,
    		GdprBanner: GdprCookies,
    		word,
    		showStats,
    		stats,
    		game,
    		toaster,
    		version,
    		delay,
    		showTutorial,
    		showContact,
    		showChangeLog,
    		showSettings,
    		showRefresh,
    		showCookieBanner,
    		board,
    		timer,
    		tips,
    		tip,
    		CheckFoodMode,
    		setContact,
    		setChangeLogVisibility,
    		submitWord,
    		win,
    		lose,
    		concede,
    		setShowStatsTrue,
    		reload,
    		$mode,
    		$letterStates,
    		$settings
    	});

    	$$self.$inject_state = $$props => {
    		if ('word' in $$props) $$invalidate(0, word = $$props.word);
    		if ('showStats' in $$props) $$invalidate(1, showStats = $$props.showStats);
    		if ('stats' in $$props) $$invalidate(2, stats = $$props.stats);
    		if ('game' in $$props) $$invalidate(3, game = $$props.game);
    		if ('toaster' in $$props) $$invalidate(6, toaster = $$props.toaster);
    		if ('showTutorial' in $$props) $$invalidate(10, showTutorial = $$props.showTutorial);
    		if ('showContact' in $$props) $$invalidate(4, showContact = $$props.showContact);
    		if ('showChangeLog' in $$props) $$invalidate(5, showChangeLog = $$props.showChangeLog);
    		if ('showSettings' in $$props) $$invalidate(7, showSettings = $$props.showSettings);
    		if ('showRefresh' in $$props) $$invalidate(11, showRefresh = $$props.showRefresh);
    		if ('showCookieBanner' in $$props) showCookieBanner = $$props.showCookieBanner;
    		if ('board' in $$props) $$invalidate(12, board = $$props.board);
    		if ('timer' in $$props) $$invalidate(13, timer = $$props.timer);
    		if ('tips' in $$props) $$invalidate(8, tips = $$props.tips);
    		if ('tip' in $$props) $$invalidate(14, tip = $$props.tip);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty[0] & /*showSettings, tips*/ 384) {
    			if (showSettings && tips) $$invalidate(14, tip = Math.floor(tips.length * Math.random()));
    		}

    		if ($$self.$$.dirty[0] & /*toaster, word*/ 65) {
    			toaster.pop(word);
    		}
    	};

    	return [
    		word,
    		showStats,
    		stats,
    		game,
    		showContact,
    		showChangeLog,
    		toaster,
    		showSettings,
    		tips,
    		modeData,
    		showTutorial,
    		showRefresh,
    		board,
    		timer,
    		tip,
    		$mode,
    		$settings,
    		version,
    		submitWord,
    		concede,
    		reload,
    		header_showRefresh_binding,
    		closeTutPopUp_handler,
    		settings_handler,
    		stats_handler,
    		tutorial_handler,
    		board_1_binding,
    		board_1_value_binding,
    		closeTutPopUp_handler_1,
    		keyboard_value_binding,
    		esc_handler,
    		keystroke_handler,
    		changelog_handler,
    		contact_handler,
    		modal0_visible_binding,
    		close_handler,
    		modal2_visible_binding,
    		modal3_visible_binding,
    		timer_1_binding,
    		timeup_handler,
    		modal4_visible_binding,
    		click_handler,
    		click_handler_1,
    		dblclick_handler,
    		contact_handler_1,
    		showChangeLog_handler,
    		tips_1_binding,
    		modal5_visible_binding
    	];
    }

    class Game extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init$1(
    			this,
    			options,
    			instance$1,
    			create_fragment$1,
    			safe_not_equal,
    			{
    				word: 0,
    				showStats: 1,
    				stats: 2,
    				game: 3,
    				toaster: 6,
    				showContact: 4,
    				showChangeLog: 5
    			},
    			null,
    			[-1, -1]
    		);

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Game",
    			options,
    			id: create_fragment$1.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*word*/ ctx[0] === undefined && !('word' in props)) {
    			console.warn("<Game> was created without expected prop 'word'");
    		}

    		if (/*stats*/ ctx[2] === undefined && !('stats' in props)) {
    			console.warn("<Game> was created without expected prop 'stats'");
    		}

    		if (/*game*/ ctx[3] === undefined && !('game' in props)) {
    			console.warn("<Game> was created without expected prop 'game'");
    		}

    		if (/*toaster*/ ctx[6] === undefined && !('toaster' in props)) {
    			console.warn("<Game> was created without expected prop 'toaster'");
    		}
    	}

    	get word() {
    		throw new Error("<Game>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set word(value) {
    		throw new Error("<Game>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get showStats() {
    		throw new Error("<Game>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set showStats(value) {
    		throw new Error("<Game>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get stats() {
    		throw new Error("<Game>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set stats(value) {
    		throw new Error("<Game>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get game() {
    		throw new Error("<Game>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set game(value) {
    		throw new Error("<Game>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get toaster() {
    		throw new Error("<Game>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set toaster(value) {
    		throw new Error("<Game>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get showContact() {
    		throw new Error("<Game>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set showContact(value) {
    		throw new Error("<Game>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get showChangeLog() {
    		throw new Error("<Game>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set showChangeLog(value) {
    		throw new Error("<Game>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\App.svelte generated by Svelte v3.46.4 */

    // (84:0) {#if toaster}
    function create_if_block(ctx) {
    	let game;
    	let updating_game;
    	let current;

    	function game_game_binding(value) {
    		/*game_game_binding*/ ctx[7](value);
    	}

    	let game_props = {
    		stats: /*stats*/ ctx[1],
    		word: /*word*/ ctx[2],
    		showContact: /*showContact*/ ctx[3],
    		toaster: /*toaster*/ ctx[4]
    	};

    	if (/*state*/ ctx[0] !== void 0) {
    		game_props.game = /*state*/ ctx[0];
    	}

    	game = new Game({ props: game_props, $$inline: true });
    	binding_callbacks.push(() => bind(game, 'game', game_game_binding));

    	const block = {
    		c: function create() {
    			create_component(game.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(game, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const game_changes = {};
    			if (dirty & /*stats*/ 2) game_changes.stats = /*stats*/ ctx[1];
    			if (dirty & /*word*/ 4) game_changes.word = /*word*/ ctx[2];
    			if (dirty & /*showContact*/ 8) game_changes.showContact = /*showContact*/ ctx[3];
    			if (dirty & /*toaster*/ 16) game_changes.toaster = /*toaster*/ ctx[4];

    			if (!updating_game && dirty & /*state*/ 1) {
    				updating_game = true;
    				game_changes.game = /*state*/ ctx[0];
    				add_flush_callback(() => updating_game = false);
    			}

    			game.$set(game_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(game.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(game.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(game, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(84:0) {#if toaster}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let toaster_1;
    	let t;
    	let if_block_anchor;
    	let current;
    	let toaster_1_props = {};
    	toaster_1 = new Toaster({ props: toaster_1_props, $$inline: true });
    	/*toaster_1_binding*/ ctx[6](toaster_1);
    	let if_block = /*toaster*/ ctx[4] && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			create_component(toaster_1.$$.fragment);
    			t = space();
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(toaster_1, target, anchor);
    			insert_dev(target, t, anchor);
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const toaster_1_changes = {};
    			toaster_1.$set(toaster_1_changes);

    			if (/*toaster*/ ctx[4]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*toaster*/ 16) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(toaster_1.$$.fragment, local);
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(toaster_1.$$.fragment, local);
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			/*toaster_1_binding*/ ctx[6](null);
    			destroy_component(toaster_1, detaching);
    			if (detaching) detach_dev(t);
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let $mode;
    	validate_store(mode, 'mode');
    	component_subscribe($$self, mode, $$value => $$invalidate(10, $mode = $$value));
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let { version } = $$props;
    	setContext("version", version);
    	localStorage.setItem("version", version);
    	let stats;
    	let word;
    	let state;
    	let showContact = false;
    	words.active_words = words.words;
    	settings.set(JSON.parse(localStorage.getItem("settings")) || createDefaultSettings());
    	settings.subscribe(s => localStorage.setItem("settings", JSON.stringify(s)));
    	const hash = window.location.hash.slice(1).split("/");

    	if (window.location.hash.substring(1) === 'contact') {
    		showContact = true;
    	}

    	const modeVal = !isNaN(GameMode[hash[0]])
    	? GameMode[hash[0]]
    	: parseInt(localStorage.getItem("mode")) || modeData.default;

    	mode.set(modeVal);

    	// If this is a link to a specific word make sure that that is the word
    	if (!isNaN(parseInt(hash[1])) && parseInt(hash[1]) < getWordNumber(modeVal)) {
    		modeData.modes[modeVal].seed = (parseInt(hash[1]) - 1) * modeData.modes[modeVal].unit + modeData.modes[modeVal].start;
    		modeData.modes[modeVal].historical = true;
    	}

    	mode.subscribe(m => {
    		localStorage.setItem("mode", `${m}`);
    		window.location.hash = GameMode[m];
    		$$invalidate(1, stats = JSON.parse(localStorage.getItem(`stats-${m}`)) || createDefaultStats(m));
    		$$invalidate(2, word = words.active_words[seededRandomInt(0, words.active_words.length, modeData.modes[m].seed)]);
    		let temp;

    		if (modeData.modes[m].historical === true) {
    			temp = JSON.parse(localStorage.getItem(`state-${m}-h`));

    			if (!temp || temp.wordNumber !== getWordNumber(m)) {
    				$$invalidate(0, state = createNewGame(m));
    			} else {
    				$$invalidate(0, state = temp);
    			}
    		} else {
    			temp = JSON.parse(localStorage.getItem(`state-${m}`));

    			if (!temp || modeData.modes[m].seed - temp.time >= modeData.modes[m].unit) {
    				$$invalidate(0, state = createNewGame(m));
    			} else {
    				// This is for backwards compatibility, can be removed in a day
    				if (!temp.wordNumber) {
    					temp.wordNumber = getWordNumber(m);
    				}

    				$$invalidate(0, state = temp);
    			}
    		}

    		// Set the letter states when data for a new game mode is loaded so the keyboard is correct
    		const letters = createLetterStates();

    		for (let row = 0; row < ROWS; ++row) {
    			for (let col = 0; col < state.board.words[row].length; ++col) {
    				if (letters[state.board.words[row][col]] === "🔳" || state.board.state[row][col] === "🟩") {
    					letters[state.board.words[row][col]] = state.board.state[row][col];
    				}
    			}
    		}

    		letterStates.set(letters);
    	});

    	function saveState(state) {
    		if (modeData.modes[$mode].historical) {
    			localStorage.setItem(`state-${$mode}-h`, JSON.stringify(state));
    		} else {
    			localStorage.setItem(`state-${$mode}`, JSON.stringify(state));
    		}
    	}

    	let toaster;
    	document.title = "Foodle | An infinite word guessing game";
    	const writable_props = ['version'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	function toaster_1_binding($$value) {
    		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
    			toaster = $$value;
    			$$invalidate(4, toaster);
    		});
    	}

    	function game_game_binding(value) {
    		state = value;
    		$$invalidate(0, state);
    	}

    	$$self.$$set = $$props => {
    		if ('version' in $$props) $$invalidate(5, version = $$props.version);
    	};

    	$$self.$capture_state = () => ({
    		modeData,
    		seededRandomInt,
    		createDefaultStats,
    		createNewGame,
    		createDefaultSettings,
    		createLetterStates,
    		ROWS,
    		getWordNumber,
    		words,
    		Game,
    		letterStates,
    		settings,
    		mode,
    		GameMode,
    		Toaster,
    		setContext,
    		version,
    		stats,
    		word,
    		state,
    		showContact,
    		hash,
    		modeVal,
    		saveState,
    		toaster,
    		$mode
    	});

    	$$self.$inject_state = $$props => {
    		if ('version' in $$props) $$invalidate(5, version = $$props.version);
    		if ('stats' in $$props) $$invalidate(1, stats = $$props.stats);
    		if ('word' in $$props) $$invalidate(2, word = $$props.word);
    		if ('state' in $$props) $$invalidate(0, state = $$props.state);
    		if ('showContact' in $$props) $$invalidate(3, showContact = $$props.showContact);
    		if ('toaster' in $$props) $$invalidate(4, toaster = $$props.toaster);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*state*/ 1) {
    			saveState(state);
    		}
    	};

    	return [
    		state,
    		stats,
    		word,
    		showContact,
    		toaster,
    		version,
    		toaster_1_binding,
    		game_game_binding
    	];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init$1(this, options, instance, create_fragment, safe_not_equal, { version: 5 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*version*/ ctx[5] === undefined && !('version' in props)) {
    			console.warn("<App> was created without expected prop 'version'");
    		}
    	}

    	get version() {
    		throw new Error("<App>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set version(value) {
    		throw new Error("<App>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    var main = new App({
        target: document.body,
        props: {
            version: "1.90",
        }
    });

    return main;

})();
//# sourceMappingURL=bundle.js.map
