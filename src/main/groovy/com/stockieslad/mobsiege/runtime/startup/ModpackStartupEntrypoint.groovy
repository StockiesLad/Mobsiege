package com.stockieslad.mobsiege.runtime.startup


import groovy.transform.CompileStatic

@CompileStatic
class ModpackStartupEntrypoint {
    static run() {
        Lifecycle.run()
        PrimitiveTechnology.run()
    }
}
