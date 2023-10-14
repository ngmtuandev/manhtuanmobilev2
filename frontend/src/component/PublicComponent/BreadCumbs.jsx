import React from 'react'
import { Link } from 'react-router-dom'
import useBreadcrumbs from 'use-react-router-breadcrumbs'
const BreadCumbs = ({category, title}) => {
    const routes = [ // path to component match
        { path: "/", breadcrumb: "Home" },
        { path: "/:category", breadcrumb: category },
        { path: "/:category/:pid/:title", breadcrumb: title },
    ]
    const breadcrumb = useBreadcrumbs(routes)
    // console.log('breadcrumb befor >>>>>>', useBreadcrumbs())
    // console.log('breadcrumb after >>>>>', breadcrumb)
    return (
    <div>
        {
            breadcrumb?.filter(el => !el?.match?.route === false).map(({match, breadcrumb}, index, self) => {
                // console.log('index >>>', index)
                // console.log('breadcrumb >>>', breadcrumb)
                // console.log('self >>>', self)
                // console.log('match >>>', match)
                // match.pathname is a path in routes 
                return <Link key={match?.pathname} to={match?.pathname}> 
                {breadcrumb} 
                <span>{index !== self.length - 1 && ' / '}</span>
            </Link>
            })
        }
    </div>
  )
}

export default BreadCumbs